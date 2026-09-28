import app from './app';
import { config } from './config/env';

app.listen(config.port, () => {
  console.log(`AquaCore API server running in ${config.nodeEnv} mode on port ${config.port}`);
});
