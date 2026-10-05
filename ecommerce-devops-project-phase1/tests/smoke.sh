#!/usr/bin/env bash
set -e

echo "Checking API Gateway..."
curl -fsS http://localhost:4000/health

echo
echo "Checking products..."
curl -fsS http://localhost:4000/api/products

echo
echo "Smoke tests passed."
