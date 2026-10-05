import mongoose from 'mongoose';
const linkSchema=new mongoose.Schema({
 id:{type:String,required:true,unique:true,index:true},
 title:{type:String,required:true,trim:true,maxlength:60},
 url:{type:String,required:true,trim:true,maxlength:2048},
 description:{type:String,default:'',maxlength:160},
 public:{type:Boolean,default:false,index:true},
 clicks:{type:Number,default:0,min:0},
 position:{type:Number,default:100},
},{timestamps:true,versionKey:false});
linkSchema.index({public:1,position:1});
export const Link=mongoose.models.Link||mongoose.model('Link',linkSchema);
