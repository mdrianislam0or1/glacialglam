import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function server() {
  try {
    await mongoose.connect(config.database_url);
    console.log('Database connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server().catch((error) => {
  console.log(error);
  process.exit(1);
});
