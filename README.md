# My Shop: AWS-Hosted Serverless Web Application

## Project Overview

My Shop is a web application built locally using React and Vite, then deployed to Amazon Web Services (AWS).

The project demonstrates how to deploy a frontend application to AWS, deliver static content securely through Amazon CloudFront and retrieve product data through a serverless API using Amazon API Gateway and AWS Lambda.

The aim of this project is to develop practical cloud computing skills by building, deploying, documenting and improving a working application.

Live Demo: https://d36aig33g6cx04.cloudfront.net
GitHub Repository: https://github.com/nigelviyolakuzvidza-ctrl/my-shop

### Application Features

The frontend includes the following features:
- Product catalogue displaying product names, images, and prices.
- Individual product detail views.
- Shopping basket with item quantities and total price calculations.
- Navigation between the home page, products, product details, and basket.
- Product data retrieved from an AWS API endpoint.
- Basket data persisted in the browser using local storage.
- The product catalogue includes wireless headphones, a Bluetooth speaker, and a USB-C charger.

### Frontend Development

The frontend was developed locally in Visual Studio Code using React and Vite.

React was used to build the application interface and manage component state, including product selection and basket functionality. CSS was used to style the product catalogue, navigation, product details and basket.

### Development Workflow

1. Developed the application locally using Visual Studio Code.
2. Used React components and JavaScript to implement the application features.
3. Used CSS to style the interface.
4. Tested the application using the Vite development server.
5. Generated an optimised production build using npm run build.
6. Uploaded the production files to Amazon S3.
7. Configured Amazon CloudFront to deliver the frontend to users.
8. Connected the frontend to an AWS serverless API for product data.

### Frontend Technologies
- React
- JavaScript
- Vite
- HTML
- CSS
- Visual Studio Code
- Git and GitHub

## AWS Architecture

The application uses two main request flows: one for delivering the frontend and another for retrieving product data.

## AWS Architecture
![AWS Architecture Diagram](images/aws-architecture.png)

### 1. Frontend Delivery
The frontend is built into static production files and stored in a private Amazon S3 bucket.

Amazon CloudFront delivers the website to users over HTTPS. Origin Access Control (OAC) allows CloudFront to access the private S3 origin without requiring the bucket to be publicly accessible.

### Website delivery:
User's Browser → Amazon CloudFront → Private Amazon S3 Bucket

### 2. Product Data API
The React frontend sends an HTTP request to Amazon API Gateway to retrieve product data. API Gateway invokes an AWS Lambda function, which returns the product information in JSON format.

### Request flow:
React Frontend → Amazon API Gateway → AWS Lambda → JSON Response
The Lambda function currently supplies the product data directly, without a separate database.

## AWS Services
| AWS Service | Purpose |
| Amazon S3 | Stores the frontend production files. |
| Amazon CloudFront | Delivers the frontend content to users over HTTPS. |
| Origin Access Control (OAC) | Restricts access to the S3 origin so CloudFront can retrieve the website files. |
| Amazon API Gateway | Exposes the HTTP API and its GET /products route. |
| AWS Lambda |Executes serverless logic and returns product data in JSON format. |

### API Endpoint

The application retrieves product data through the following endpoint:

https://x6vdt6btc5.execute-api.eu-west-2.amazonaws.com/products

HTTP method: GET
Response format: JSON

### Cloud Skills Demonstrated
This project provides practical experience with:

- Deploying a frontend application to AWS.
- Building a production version of a React application.
- Hosting static assets in Amazon S3.
- Configuring Amazon CloudFront for content delivery.
- Using Origin Access Control to protect a private S3 origin.
- Creating an HTTP API using Amazon API Gateway.
- Integrating API Gateway with AWS Lambda.
- Returning JSON data from a serverless backend.
- Configuring cross-origin resource sharing (CORS).
- Connecting a frontend application to a cloud-hosted API.
- Using Git and GitHub for source control and project documentation.

### Deployment
The deployment process involved building the frontend locally and hosting the resulting static files on AWS.

1. Developed and tested the application locally.
2. Created an optimised production build using Vite.
3. Uploaded the production files to Amazon S3.
4. Configured CloudFront to use the S3 bucket as its origin.
5. Configured Origin Access Control for private S3 access.
6. Created an API Gateway route for retrieving product data.
7. Integrated the API route with AWS Lambda.
8. Configured CORS to allow requests from the deployed frontend.
9. Tested the deployed website and API endpoint.

# Deployment Evidence
Amazon S3
## Amazon S3 Deployment
![Amazon S3 Deployment](images/s3-deployment.png)
Amazon CloudFront
## Amazon CloudFront
![CloudFront Distribution](images/cloudfront-distribution.png)
Amazon API Gateway
## Amazon API Gateway
![API Gateway Route](images/api-gateway-route.png)
AWS Lambda
### AWS Lambda

![AWS Lambda Function](images/lambda-function.png)


Future Improvements
Potential improvements include:
Store product information in Amazon DynamoDB instead of defining it directly in Lambda.
Automate builds and deployments using GitHub Actions.
Introduce infrastructure as code using AWS SAM, AWS CDK, or Terraform.
Add structured logging and monitoring with Amazon CloudWatch.
Add automated tests and deployment validation.
Implement a more complete checkout flow and additional backend functionality.

Project Status
The core frontend and AWS hosting components have been configured, and the application has been deployed. The serverless API is integrated with the frontend.
Further documentation, testing and enhancements will be completed as the project develops.
This project is part of my ongoing development of practical AWS and cloud architecture skills.
