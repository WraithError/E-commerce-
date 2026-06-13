# AWS Deployment Configuration

This project is configured with GitHub Actions for automated CI/CD and deployment to AWS.

## Required AWS Setup

### 1. IAM Role for GitHub Actions

Create an IAM role `github-actions-role` with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistribution"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2. S3 Bucket Configuration

- Create an S3 bucket for storing your built application
- Enable versioning for backup
- Configure as a static website endpoint or use CloudFront for distribution

### 3. CloudFront Distribution (Optional but Recommended)

- Create a CloudFront distribution pointing to your S3 bucket
- Configure caching headers for optimal performance
- Enable HTTPS with ACM certificate

## GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
AWS_ACCOUNT_ID          = Your AWS Account ID
AWS_S3_BUCKET           = Your S3 bucket name
AWS_CLOUDFRONT_DISTRIBUTION_ID = Your CloudFront distribution ID (optional)
```

## Workflows

### 1. CI/CD Workflow (ci.yml)
- Triggers on: push to main/develop, pull requests
- Tests on Node.js 18.x and 20.x
- Runs linting, type checking, and builds
- Uploads build artifacts

### 2. AWS Deployment (deploy-aws.yml)
- Triggers on: push to main/production branches
- Builds the application
- Authenticates with AWS using OIDC
- Deploys to S3
- Invalidates CloudFront cache
- Manual trigger available via workflow_dispatch

### 3. Code Quality (code-quality.yml)
- Triggers on: push/PR to main/develop, scheduled daily
- Runs ESLint
- Performs TypeScript type checking
- Checks for security vulnerabilities (npm audit)
- Verifies dependencies are up to date

## Environment Variables

Create a `.env` file locally (not committed to git):

```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=E-WebStore
```

For GitHub Actions, create a `.env.production` or configure via workflow secrets.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
npm run lint:fix

# Type checking
npm run typecheck

# Preview production build
npm run preview
```

## Deployment Steps

1. **Commit and push** your changes to the `main` or `develop` branch
2. **GitHub Actions** automatically runs CI checks
3. **If successful**, merge to `main` to trigger AWS deployment
4. **Manual deployment**: Use `workflow_dispatch` in GitHub Actions tab

## Troubleshooting

### Build fails
- Check Node.js version compatibility (18.x or 20.x)
- Verify all environment variables are set
- Run `npm ci` to install exact dependency versions

### AWS deployment fails
- Verify AWS credentials are correct in GitHub secrets
- Check IAM role permissions
- Ensure S3 bucket exists and is accessible
- Verify CloudFront distribution ID if using CloudFront

### OIDC Authentication issues
- Ensure GitHub OIDC provider is configured in AWS
- Check IAM role trust relationship includes GitHub
- Verify Account ID in secrets is correct

## Performance Optimization

For S3 static site serving:
- Enable gzip compression on CloudFront
- Configure proper cache headers in workflow
- Use CloudFront geo-restriction if needed
- Enable versioning for rollback capability

## Security Best Practices

- Use OIDC for authentication (no long-lived credentials)
- Restrict S3 bucket access with bucket policies
- Enable CloudFront Origin Access Identity (OAI)
- Use environment-specific deployments
- Review and approve critical deployments
