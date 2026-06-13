#!/bin/bash
# AWS Deployment Helper Script
# Usage: ./scripts/setup-aws.sh

set -e

echo "🚀 E-WebStore AWS Deployment Setup"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install it first:${NC}"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI found${NC}"
echo ""

# Get AWS Account ID
echo "Getting AWS Account ID..."
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account ID: $AWS_ACCOUNT_ID${NC}"

# Create S3 bucket
read -p "Enter S3 bucket name (e.g., my-app-prod): " BUCKET_NAME
read -p "Enter AWS region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

echo ""
echo "📦 Creating S3 bucket: $BUCKET_NAME in region $AWS_REGION..."

if aws s3 ls "s3://$BUCKET_NAME" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Bucket already exists${NC}"
else
    if [ "$AWS_REGION" = "us-east-1" ]; then
        aws s3 mb "s3://$BUCKET_NAME" --region "$AWS_REGION"
    else
        aws s3 mb "s3://$BUCKET_NAME" --region "$AWS_REGION" \
            --create-bucket-configuration LocationConstraint="$AWS_REGION"
    fi
    echo -e "${GREEN}✅ S3 bucket created${NC}"
fi

# Enable versioning
echo "Enabling S3 versioning..."
aws s3api put-bucket-versioning \
    --bucket "$BUCKET_NAME" \
    --versioning-configuration Status=Enabled
echo -e "${GREEN}✅ Versioning enabled${NC}"

# Configure static website (optional)
read -p "Configure as static website? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Configuring static website hosting..."
    aws s3 website "s3://$BUCKET_NAME" \
        --index-document index.html \
        --error-document index.html
    echo -e "${GREEN}✅ Static website hosting configured${NC}"
fi

echo ""
echo "📋 Summary:"
echo "==========="
echo "AWS Account ID: $AWS_ACCOUNT_ID"
echo "S3 Bucket: $BUCKET_NAME"
echo "Region: $AWS_REGION"
echo ""
echo "📝 Add these to GitHub Secrets:"
echo "   AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID"
echo "   AWS_S3_BUCKET=$BUCKET_NAME"
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo "Next: Create IAM role and CloudFront distribution (see AWS_DEPLOYMENT.md)"
