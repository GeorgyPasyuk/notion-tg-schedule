const { exec } = require('child_process');

exports.handler = async (event, context) => {
  const command = 'docker-compose up -d';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return context.status(500).succeed({ message: 'Failed to start the Docker containers', error });
    }

    return context.status(200).succeed({ message: 'Docker containers started successfully', stdout, stderr });
  });
};
