import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server().catch((err) => console.log(err));
