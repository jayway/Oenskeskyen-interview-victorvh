# Run project locally

1. Start Docker Daemon (Docker Desktop on macOS)
2. run `sudo bash start.sh` to spin up a docker container with MariaDB, install node_modules and start the project

- content of script;
  npm install;
  docker-compose up -d;
  npm run start;

3. login to `localhost:8080` with credentials username=`root`, password=`example`
4. In the top-left corner, press the `import` button
5. Under `File upload` press `Choose Files` and select the `transaction.sql` file in the root of the project.
6. The app is now running, the database is populated and it's ready to go.

# Questions - Answers

1. What do you see as potential issues, if the volume of transactions per payment note is ever increasing?
   MySQL is hard to scale horizontally and if the volumes of transactions per payment note becomes too high,
   we won't have enough memory on the server when we are updating the transactions and using the SUM and COUNT SQL functions. MySQL would also suffer from bad performance at large scale, making it not a good choice for this sort of high volume data.

Running this during peak hours with high volumes of data, could also become a problem and slow down the database, impacting the end users reponse time.

2. If you had the option to choose any tech-stack & service(s) to help scale up the handling of an ever increasing volume of transactions, which would you choose & how would each chosen option help?

We could use a managed database service like Google SQL or Google BigQuery instead of a MySQL database that is hard to scale horizontally. This would allow us to scale almost infinitely without having to worry about compute resources.

If we have to worry about compute resources and time is not of the essence, we could implement the solution with a queue that batches the update operations.

2.1 Would the chosen options change the architecture of the code written for this task? If so, explain briefly what would change.
I already tried to seperate the endpoint handlers like we were going to run them as cloud functions, so if we used a manage database system that could auto-scale for us, we wouldn't have to change much about the structure of our code.

If we implemented a queue system for batching, we would need seperate microservices / cloudfunctions to handle pushing and popping from the queue.
