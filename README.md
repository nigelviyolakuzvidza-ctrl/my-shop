# My Shop: AWS-Hosted Serverless Web Application

## Project Overview

My Shop is a web application built locally using React and Vite, then deployed to Amazon Web Services (AWS).

The project demonstrates how to host a frontend application securely using Amazon S3 and Amazon CloudFront, retrieve product data through a serverless API, and manage AWS infrastructure using Infrastructure as Code (IaC).

Users can browse products, view product details, manage shopping basket quantities and calculate totals. Product information is stored in Amazon DynamoDB and retrieved dynamically through Amazon API Gateway and AWS Lambda.

The aim of this project is to develop practical cloud computing skills by building, deploying, documenting and improving a working application.

## Application Screenshots

### Shop Homepage
![Shop Homepage](image/shop-homepage.png)

### Product Details
![Product Details](image/shop-product-detail.png)

### Shopping Basket
![Shopping Basket](image/shop-basket.png)

## GitHub Repository: https://github.com/nigelviyolakuzvidza-ctrl/my-shop

### Application Features

The frontend includes the following features:
- Product catalogue: Displays product names, images and prices retrieved from the backend API.
- Product details: Individual views showing information about selected products.
- Shopping basket: Supports item quantities and calculates item totals and the overall basket value.
- Navigation: Allows users to navigate between the homepage, product catalogue, product details and shopping basket.
- AWS API integration: Retrieves product data through an Amazon API Gateway endpoint backed by AWS Lambda.
- Basket persistence: Uses browser local storage to preserve basket contents between page refreshes.
- DynamoDB integration: Stores product information, including wireless headphones, a Bluetooth speaker and a USB-C charger.

### Frontend Development

The frontend was developed locally in Visual Studio Code using React and Vite.

React was used to build the application interface and manage component state, including product selection and shopping basket functionality. CSS was used to style the product catalogue, navigation, product details and basket.

Vite provided the local development server and production build tooling, allowing the application to be tested locally before deployment to AWS.

### Development Workflow

The deployment process involved building the frontend locally and hosting the resulting static files on AWS, then integrating the application with a serverless backend. 

1. Developed and tested the React application locally using Visual Studio Code and Vite.
2. Created an optimised production build using npm run build.
3. Uploaded the production files from the dist/ directory to a private Amazon S3 bucket.
4. Configured Amazon CloudFront to use the S3 bucket as its origin.
5. Configured Origin Access Control (OAC) to allow CloudFront to access the private S3 origin.
6. Created an Amazon DynamoDB table named Products to store product information.
7. Created an AWS Lambda function to retrieve product records from DynamoDB.
8. Configured the Lambda execution role with the permissions required to access DynamoDB and write logs to CloudWatch.
9. Created an Amazon API Gateway HTTP API with a GET /products route integrated with Lambda.
10. Configured CORS to allow requests from the local development environment and deployed frontend.
11. Tested the deployed website and verified that changes to DynamoDB product records appeared in the frontend.
12. Configured CloudWatch alarms to monitor Lambda errors and API Gateway 5xx errors, with Amazon SNS email notifications.
13. Documented the architecture, configuration and screenshots in the GitHub repository.

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

![AWS Architecture Diagram](https://github.com/nigelviyolakuzvidza-ctrl/my-shop/blob/main/image/aws-architecture.png)

### 1. Frontend Delivery

The frontend is built into static production files and stored in a private Amazon S3 bucket.

Amazon CloudFront delivers the website to users over HTTPS. Origin Access Control (OAC) allows CloudFront to access the private S3 origin without requiring the bucket to be publicly accessible.

### Website delivery:
User's Browser → Amazon CloudFront → Private Amazon S3 Bucket

### 2. Product Data API

The React frontend sends an HTTP GET request to Amazon API Gateway to retrieve product data. API Gateway invokes an AWS Lambda function, which queries Amazon DynamoDB for the product information and returns the results in JSON format.

### Request flow:
React Frontend → Amazon API Gateway → AWS Lambda → Amazon DynamoDB
### Flow response 
Amazon DynamoDB → AWS Lambda → Amazon API Gateway → React Frontend

The Lambda function uses the AWS SDK for JavaScript to retrieve items from the DynamoDB Products table. It sorts the results by product ID and returns them as a JSON response.

## Active Deployment

The current working deployment is managed through the sam-app CloudFormation stack.
The original duplicate resources were removed after confirming that the SAM-managed storefront continued to work.

## AWS Services
| AWS Service | Purpose |
| Amazon S3 | Stores the frontend production files. |
| Amazon CloudFront | Delivers the frontend content to users over HTTPS. |
| Origin Access Control (OAC) | Restricts access to the S3 origin so CloudFront can retrieve the website files. |
| Amazon API Gateway | Exposes the HTTP API and its GET /products route. |
| AWS Lambda | Executes serverless logic and returns product data in JSON format. |
| Amazon DynamoDB | Stores the product catalogue in the products table |
| AWS IAM | Controls Lambda's permissions to access DynamoDB and write logs to CloudWatch| 
|Amazon CloudWatch | Collects Lambda logs and metrics and monitors Lambda errors and API Gateway 5xx errors |
| Amazon SNS | Sends email notifications associated with the CloudWatch alarms |
| AWS CloudFormation | Provisions and manages infrastructure from templates |
| AWS SAM | Defines and deploys the serverless application using a CloudFormation-based template |

## Infrastructure as Code (IaC)

### Overview 
Infrastructure as Code was introduced to make the AWS environment easier to define, reproduce, validate and manage.

I used the AWS CloudFormation IaC generator to scan existing AWS resources, selected the relevant infrastructure components and generated a YAML template. I then used the template as the basis for an AWS SAM application developed in Visual Studio Code.

The SAM application was validated and tested, deployed to AWS, and committed to GitHub.

This provided practical experience with resource discovery, infrastructure templating, serverless deployment and infrastructure version control.

## Infrastructure Defined in the SAM Template

The SAM template defines the following resources:

- Amazon DynamoDB: A product table with a partition key named id and on-demand billing.
- AWS Lambda: A Node.js function that retrieves product records from DynamoDB.
- Amazon API Gateway: An HTTP API with a GET /products route integrated with Lambda.
- Amazon S3: A private bucket for hosting the React production build.
- Amazon CloudFront: A distribution that delivers frontend content over HTTPS.
- CloudFront Origin Access Control: Secure access to the private S3 origin.
- AWS IAM: A Lambda execution role with the required DynamoDB permissions.
- Amazon CloudWatch: Alarms for Lambda errors and API Gateway 5xx errors.
- Amazon SNS: An email notification topic associated with the monitoring alarms.

## Deployment and Validation (IaC)

The infrastructure workflow involved:

1. Discovering existing AWS resources with the CloudFormation IaC generator.
2. Selecting the relevant resources for the application.
3. Creating and downloading a YAML infrastructure template.
4. Developing the SAM application in Visual Studio Code.
5. Defining the Lambda function, API Gateway integration, DynamoDB table, frontend hosting and monitoring resources.
6. Validating and testing the SAM application.
7. Deploying the infrastructure through AWS SAM and CloudFormation.
8. Verifying the deployed resources and confirming that the storefront remained functional.
9. Committing the IaC work to GitHub.
10. Removing the redundant original resources after verifying the active SAM deployment.

## Deployment Commands 

From the directory containing template.yaml, the typical SAM workflow is:

sam validate
sam build
sam deploy --guided

The guided deployment requires the relevant deployment configuration, including the email address supplied through the AlertEmail parameter. Review the deployment changes before approving them.

Subsequent deployments can use the saved configuration:

sam build
sam deploy

The frontend deployment is a separate step because the SAM template provisions the S3 bucket and CloudFront distribution but does not itself build or upload the React application.

Build the frontend from the React project directory:

npm install
npm run build

Upload the generated production files to the S3 bucket identified by the CloudFormation output FrontendBucketName:

aws s3 sync dist/ s3://YOUR_FRONTEND_BUCKET_NAME/

After uploading changes, invalidate the CloudFront cache when necessary:

aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

Replace the placeholders with the actual bucket name and distribution ID. These commands assume the AWS CLI is configured for the correct account and region.

### API Endpoint

The application retrieves product data throughan Amazon API Gateway HTTP API endpoint.

- HTTP method: GET
- Route: /******
- AWS Region: eu-west-2 (London)
- Purpose: Retrieves product records from DynamoDB through AWS Lambda.

### Cloud Skills Demonstrated

- This project provides practical experience with:
- Building and deploying a React application to AWS.
- Hosting static assets in a private Amazon S3 bucket.
- Configuring Amazon CloudFront and Origin Access Control.
- Creating and integrating an Amazon API Gateway HTTP API.
- Developing and deploying AWS Lambda functions using Node.js.
- Retrieving product records from Amazon DynamoDB.
- Configuring IAM permissions for serverless applications.
- Configuring CORS for frontend-to-API communication.
- Monitoring applications with CloudWatch logs, metrics and alarms.
- Configuring SNS email notifications.
- Discovering existing infrastructure with the CloudFormation IaC generator.
- Defining infrastructure with AWS SAM and CloudFormation.
- Validating, deploying and troubleshooting infrastructure as code.
- Managing infrastructure templates and application code using Git and GitHub.
- Identifying and removing duplicate resources while preserving the working deployment.


## AWS Deployment Evidence

### Amazon S3

![Amazon S3 Deployment](image/s3-deployment.png)

### Amazon CloudFront

![CloudFront Distribution](image/cloudfront-distribution.png)

### Amazon API Gateway

![API Gateway GET Products Route](image/api-gateway-route.png)

### AWS Lambda Function

![Lambda Function Overview](image/lambda-function.png)

### Lambda Test Execution

![Lambda Test Execution](image/lambda-test.png)

## Future Improvements

Potential improvements include:
- Store product information in Amazon DynamoDB instead of defining it directly in Lambda. (Done)
- Automate builds and deployments using GitHub Actions.
- Introduce infrastructure as code using AWS SAM, AWS CDK, or Terraform. (Done)
- Add structured logging and monitoring with Amazon CloudWatch. (Done)
- Add automated tests and deployment validation.
- Implement a more complete checkout flow and additional backend functionality.
- Add CloudWatch logging, metrics and alarms (Done)

## Project Status

The React/Vite storefront is deployed and working through Amazon CloudFront. Product data is retrieved through API Gateway and Lambda from DynamoDB.

The infrastructure has been defined and deployed using AWS SAM and CloudFormation. CloudWatch alarms and SNS email notifications are configured for monitoring.

The duplicate original resources have been removed, leaving the SAM-managed deployment as the active project infrastructure.

This project is part of my ongoing development of practical AWS cloud engineering, serverless architecture, infrastructure as code, monitoring and deployment skills.
