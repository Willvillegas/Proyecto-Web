import mongoose from 'mongoose'

export async function connectBD(url:string): Promise<void> {
    try{
        await mongoose.connect(url)
        console.log('Database connected')
    }catch(e){
        console.error('Error connecting to database')
        console.error(e)
}
}