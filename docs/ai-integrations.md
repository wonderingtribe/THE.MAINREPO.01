# AI Provider Integrations

This document explains how to configure and use multiple AI providers with Ai-bilder.

## Supported Providers

Ai-bilder supports the following AI providers:
- **OpenAI** (GPT-3.5, GPT-4, and newer models)
- **Anthropic** (Claude models)
- **Azure OpenAI** (Microsoft-hosted OpenAI models)

## Configuration

### Environment Variables

Configure your AI provider using environment variables in your `.env` file:

```bash
# Select your primary AI provider
AI_PROVIDER=openai  # Options: openai, anthropic, azure-openai

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Anthropic Configuration
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your-azure-openai-key-here

# Rate Limiting
RATE_LIMIT_QPS=10  # Queries per second (adjust based on your API tier)

# Caching
CACHE_TTL_SECONDS=60  # Cache responses for 60 seconds
```

### Provider-Specific Setup

#### OpenAI

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key from your account settings
3. Set `AI_PROVIDER=openai` and `OPENAI_API_KEY` in your `.env`

#### Anthropic (Claude)

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Set `AI_PROVIDER=anthropic` and `ANTHROPIC_API_KEY` in your `.env`

#### Azure OpenAI

1. Set up an Azure OpenAI resource in the Azure Portal
2. Deploy a model (e.g., GPT-4)
3. Get your endpoint and API key
4. Set `AI_PROVIDER=azure-openai`, `AZURE_OPENAI_ENDPOINT`, and `AZURE_OPENAI_KEY` in your `.env`

## Rate Limiting

Each AI provider has different rate limits based on your subscription tier:

- **OpenAI**: Varies by tier (free, pay-as-you-go, enterprise)
- **Anthropic**: Varies by plan
- **Azure OpenAI**: Based on your Azure subscription and deployment

Configure `RATE_LIMIT_QPS` (Queries Per Second) to match your provider's limits:

```bash
RATE_LIMIT_QPS=10  # Conservative default
# For higher tiers, you might use:
# RATE_LIMIT_QPS=50  # Pro tier
# RATE_LIMIT_QPS=100 # Enterprise tier
```

### Best Practices for Rate Limiting

- Start with a conservative limit and increase gradually
- Monitor your API usage in your provider's dashboard
- Implement exponential backoff for failed requests
- Use caching to reduce API calls

## Caching

Ai-bilder includes built-in response caching to reduce costs and improve performance:

```bash
CACHE_TTL_SECONDS=60  # Cache responses for 60 seconds
```

### Caching Strategies

- **Short TTL (30-60s)**: For dynamic, frequently-changing content
- **Medium TTL (5-15 min)**: For semi-static content
- **Long TTL (1+ hour)**: For static or rarely-changing content

### When to Use Caching

✅ **Good use cases:**
- Repeated queries with identical inputs
- Static content generation
- Template-based responses

❌ **Avoid caching for:**
- Real-time data requests
- User-specific personalized content
- Time-sensitive information

## Retry Logic

Ai-bilder implements automatic retry logic for transient failures:

- **Retry attempts**: 3 by default
- **Backoff strategy**: Exponential with jitter
- **Retry conditions**: Network errors, rate limits, temporary server errors

### Error Handling

Different error types are handled differently:

- **Rate Limit Errors (429)**: Automatically retried with backoff
- **Authentication Errors (401)**: Not retried - check your API keys
- **Server Errors (500, 502, 503)**: Retried up to 3 times
- **Client Errors (400)**: Not retried - check your request format

## Bring Your Own Model (BYOM)

Ai-bilder supports using your own model endpoints. This is useful for:

- Custom fine-tuned models
- Self-hosted models
- Alternative providers not listed above

### Configuration

Set environment variables for your custom endpoint:

```bash
AI_PROVIDER=custom
CUSTOM_AI_ENDPOINT=https://your-model-endpoint.com/v1
CUSTOM_AI_KEY=your-api-key
```

## Monitoring and Debugging

### API Usage Tracking

Monitor your API usage through:
- Provider dashboards (OpenAI, Anthropic, Azure)
- Application logs
- Cost tracking tools

### Common Issues

**Issue: Authentication errors**
- Solution: Verify your API keys are correct and active

**Issue: Rate limit exceeded**
- Solution: Reduce `RATE_LIMIT_QPS` or upgrade your API tier

**Issue: Slow responses**
- Solution: Implement caching or use faster models

**Issue: High costs**
- Solution: Use caching, optimize prompts, or switch to cheaper models

## Security Best Practices

1. **Never commit API keys to version control**
   - Always use `.env` files (included in `.gitignore`)
   - Use environment variables in production

2. **Rotate keys regularly**
   - Set up a key rotation schedule
   - Revoke old keys after rotation

3. **Use least privilege**
   - Only grant necessary permissions
   - Use separate keys for different environments

4. **Monitor for anomalies**
   - Set up alerts for unusual usage patterns
   - Review API logs regularly

5. **Secure your environment**
   - Use HTTPS for all API communications
   - Implement proper authentication in your application
   - Keep dependencies up to date

## Provider Comparison

| Feature | OpenAI | Anthropic | Azure OpenAI |
|---------|--------|-----------|--------------|
| Model Variety | ✅ Extensive | ✅ Claude series | ✅ OpenAI models |
| Pricing | 💰 Pay-per-use | 💰 Pay-per-use | 💰 Azure pricing |
| Rate Limits | Tier-based | Tier-based | Custom |
| Enterprise Support | ✅ Yes | ✅ Yes | ✅ Yes |
| Data Privacy | Standard | Enhanced | Azure compliance |
| Custom Models | ✅ Fine-tuning | Limited | ✅ Fine-tuning |

## Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

## Support

For issues specific to AI provider integration:
1. Check provider status pages
2. Review API documentation
3. Check application logs
4. Open an issue in this repository with relevant details
