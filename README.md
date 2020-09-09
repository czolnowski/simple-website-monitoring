# Simple website monitoring

# Setup

- create config.yml file
- npm install
- npm run lint
- npm test
- npm start

# Configuration

Initial configuration can be delivered with config.yml file. Following structure is required:

```
websites:
  - url: https://dka.io
    name: DKA
    interval: 1000
    rawSize: 1000
    expectedStatus: 200
    bodyShouldContains:
      - Dunning, Kruger &amp; Associates is a digital design and engineering consultancy driven by people and culture.
    responseTimeLowerThan: 1000
```

Parameters:

  * **url** - URL to website which should be under monitoring - with protocol. Must be unique within runtime.
  * **name** - Human readable name of the website.
  * **interval** - Interval of every check in miliseconds. 
  * **rawSize** - How many checks should be stored in memory.
  * **expectedStatus** - Expected HTTP status to verify if check was successful or not.
  * **bodyShouldContains** - List of strings which should be included in response body to verify if check was successful or not.
  * **responseTimeLowerThan** - Maximum response time to verify if check was successful or not.


# Usage

Application will work as standalone daemon. To access collected metrics you may use API endpoint. If you want to add new website check during application runtime it is also possible by using API endpoint. 

## Read metrics collected for given URL

```
curl -i "http://localhost:3000/https%3A%2F%2Fdka.io"
```

## Add new website check

```
curl -i "http://localhost:3000/" -X POST -H 'Content-type: application/json' --data '{"name": "Cujo.AI", "url":"https://cujo.com", "interval": 5000, "expectedStatus": 200, "bodyShouldContains": ["<title>Network Intelligence Analytics &amp; Digital Life Protection Solutions - CUJO AI</title>"], "responseTimeLowerThan": 1500}'
```

And then to read collected metrics:

```
curl -i "http://localhost:3000/https%3A%2F%2Fcujo.com"
```