import crypto from 'node:crypto';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { Link } from './models/link.mjs';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';

const required = ['MONGODB_URI', 'OWNER_EMAIL', 'ADMIN_PASSWORD', 'SESSION_SECRET', 'FRONTEND_ORIGIN'];
for (const name of required) if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
if (process.env.SESSION_SECRET.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters.');
if (process.env.ADMIN_PASSWORD.length < 14) throw new Error('ADMIN_PASSWORD must contain at least 14 characters.');
const ownerEmail = process.env.OWNER_EMAIL.trim().toLowerCase();
const frontendOrigin = new URL(process.env.FRONTEND_ORIGIN).origin;
const production = process.env.NODE_ENV === 'production';

const defaults = [
  ['linkedin','LinkedIn','https://www.linkedin.com/in/josiah-ewumi-319879334','Experience, ideas & professional connections',1],
  ['github','GitHub','https://github.com/Your-Boy-Josiah','Code, experiments & things I’m building',2],
  ['tiktok','TikTok','https://www.tiktok.com/@y_boy_josiah','Creative moments & a different side of me',3],
];
const createSchema = z.object({title:z.string().trim().min(1).max(60),url:z.string().trim().max(2048).url().refine(s=>{const u=new URL(s);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password}),description:z.string().trim().max(160),public:z.boolean()}).strict();
const updateSchema = createSchema.partial().refine(v=>Object.keys(v).length>0);
const idSchema = z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/);
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({origin:frontendOrigin,credentials:true,methods:['GET','POST','PATCH','OPTIONS'],allowedHeaders:['Content-Type']}));
app.use(express.json({limit:'8kb'}));
const loginLimiter=rateLimit({windowMs:15*60*1000,limit:10,standardHeaders:'draft-8',legacyHeaders:false});
const noStore=(_req,res,next)=>{res.set('Cache-Control','private, no-store');next()};
const cookieName='josiah_admin';
function sign(value){return crypto.createHmac('sha256',process.env.SESSION_SECRET).update(value).digest('base64url')}
function makeToken(){const payload=Buffer.from(JSON.stringify({email:ownerEmail,exp:Date.now()+7*24*60*60*1000})).toString('base64url');return `${payload}.${sign(payload)}`}
function validToken(token){if(!token)return false;const [payload,signature,...extra]=token.split('.');if(!payload||!signature||extra.length)return false;const expected=Buffer.from(sign(payload));const actual=Buffer.from(signature);if(actual.length!==expected.length||!crypto.timingSafeEqual(actual,expected))return false;try{const session=JSON.parse(Buffer.from(payload,'base64url').toString());return session.email===ownerEmail&&session.exp>Date.now()}catch{return false}}
function isOwner(req){const token=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith(`${cookieName}=`))?.slice(cookieName.length+1);return validToken(token)}
function requireOwner(req,res,next){if(!isOwner(req))return res.status(401).json({error:'Sign in to manage your links.'});next()}
function requireTrustedOrigin(req,res,next){if(req.get('origin')!==frontendOrigin)return res.status(403).json({error:'Request origin is not allowed.'});next()}
app.get('/health',async(_req,res)=>{try{await mongoose.connection.db.admin().ping();res.json({status:'ok'})}catch{res.status(503).json({status:'database_unavailable'})}});
app.post('/api/auth/login',loginLimiter,requireTrustedOrigin,(req,res)=>{const email=typeof req.body?.email==='string'?req.body.email.trim().toLowerCase():'';const password=typeof req.body?.password==='string'?req.body.password:'';if(email!==ownerEmail||!crypto.timingSafeEqual(crypto.createHash('sha256').update(password).digest(),crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD).digest()))return res.status(401).json({error:'Email or password is incorrect.'});res.cookie(cookieName,makeToken(),{httpOnly:true,secure:production,sameSite:'lax',path:'/',maxAge:7*24*60*60*1000});res.json({ok:true})});
app.post('/api/auth/logout',requireTrustedOrigin,(req,res)=>{res.clearCookie(cookieName,{httpOnly:true,secure:production,sameSite:'lax',path:'/'});res.json({ok:true})});
app.get('/api/auth/session',noStore,(req,res)=>res.json({authenticated:isOwner(req)}));
app.get('/api/public-links',async(_req,res)=>{try{const links=await Link.find({public:true}).select('id title description -_id').sort({position:1,id:1}).lean();res.set('Cache-Control','public, max-age=30, stale-while-revalidate=60').json({links})}catch{res.status(503).json({error:'Links are temporarily unavailable.'})}});
app.get('/api/links',noStore,requireOwner,async(_req,res)=>{try{const links=await Link.find().select('-_id id title url description public clicks position').sort({position:1,id:1}).lean();res.json({links})}catch{res.status(503).json({error:'Links are temporarily unavailable.'})}});
app.post('/api/links',noStore,requireTrustedOrigin,requireOwner,async(req,res)=>{const data=createSchema.safeParse(req.body);if(!data.success)return res.status(400).json({error:'Check the title, URL, description, and visibility.'});try{const {title,url,description,public:visible}=data.data;await Link.create({id:crypto.randomUUID(),title,url,description,public:visible});const links=await Link.find().select('-_id id title url description public clicks position').sort({position:1,id:1}).lean();res.status(201).json({links})}catch{res.status(503).json({error:'Could not save the link.'})}});
app.patch('/api/links/:id',noStore,requireTrustedOrigin,requireOwner,async(req,res)=>{if(!idSchema.safeParse(req.params.id).success)return res.status(400).json({error:'Invalid link ID.'});const parsed=updateSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({error:'Check the link details.'});try{const changed=await Link.findOneAndUpdate({id:req.params.id},{$set:parsed.data},{new:true,runValidators:true});if(!changed)return res.status(404).json({error:'Link not found.'});const links=await Link.find().select('-_id id title url description public clicks position').sort({position:1,id:1}).lean();res.json({links})}catch{res.status(503).json({error:'Could not save the link.'})}});
app.head('/go/:id',async(req,res)=>{if(!idSchema.safeParse(req.params.id).success)return res.sendStatus(404);try{const link=await Link.findOne({id:req.params.id,$or:[{public:true},{public:isOwner(req)}]}).select('id').lean();res.sendStatus(link?200:404)}catch{res.sendStatus(503)}});
app.get('/go/:id',async(req,res)=>{if(!idSchema.safeParse(req.params.id).success)return res.sendStatus(404);try{const owner=isOwner(req);const prefetch=req.get('purpose')==='prefetch'||req.get('sec-purpose')?.includes('prefetch');const filter={id:req.params.id,$or:[{public:true},{public:owner}]};const link=prefetch?await Link.findOne(filter).select('url').lean():await Link.findOneAndUpdate(filter,{$inc:{clicks:1}},{new:true}).select('url').lean();if(!link)return res.sendStatus(404);res.set('Referrer-Policy','no-referrer').redirect(302,link.url)}catch{res.status(503).send('This link is temporarily unavailable.')}});
await mongoose.connect(process.env.MONGODB_URI);
for (const [id,title,url,description,position] of defaults) await Link.updateOne({id},{$setOnInsert:{id,title,url,description,public:true,position}},{upsert:true});
app.listen(Number(process.env.PORT)||4000,'0.0.0.0',()=>console.log(`Backend listening on ${Number(process.env.PORT)||4000}`));
