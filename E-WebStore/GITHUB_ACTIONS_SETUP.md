# E-WebStore - GitHub Actions Setup Guide

## Quick Start

This project is ready for GitHub Actions CI/CD with AWS deployment. Follow these steps:

### Step 1: Set Up AWS Resources

1. **Create IAM Role** for GitHub Actions OIDC
   - Go to AWS IAM → Roles → Create Role
   - Select "Web identity" provider: GitHub
   - Set audience to `sts.amazonaws.com`
   - Attach S3 and CloudFront permissions

2. **Create S3 Bucket**
   - Name: `your-app-name-prod`
   - Enable versioning
   - Block public access (use CloudFront)

3. **Create CloudFront Distribution** (Optional)
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Set default root object to `index.html`

### Step 2: Configure GitHub Secrets

In your repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `AWS_ACCOUNT_ID`: Your 12-digit AWS Account ID
   - `AWS_S3_BUCKET`: Your S3 bucket name
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (optional)

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Add GitHub Actions workflows"
git push origin main
```

The workflows will automatically start running!

## Workflow Overview

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | push/PR to main/develop | Build, lint, test |
| **Deploy AWS** | push to main/production | Deploy to S3 & CloudFront |
| **Code Quality** | push/PR, daily schedule | Security & quality checks |

## Next Steps

1. ✅ Create AWS resources (IAM role, S3, CloudFront)
2. ✅ Add GitHub secrets
3. ✅ Push this code to GitHub
4. ✅ Watch workflows run in GitHub Actions tab
5. ✅ Verify deployment in AWS

## Support

- Check workflow logs: Repository → Actions → [Workflow name]
- Review AWS_DEPLOYMENT.md for detailed setup
- Troubleshoot in the Code Quality workflow logs
