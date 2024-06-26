# Yext Knowledge Base Prototype
This website uses the new entity-level authorization feature set to gate access to specific pages and entity content depending on the user.

- [Knowledge Graph](https://www.yext.com/s/4066668/entities2?b=4066668)
- [Deployments](https://www.yext.com/s/4066668/yextsites/136813/branch/99212/deploys/recent)
- [Site](https://yext-poc-knowledge-base.pgsdemo.com/)
- [Developer Console App](https://www.yext.com/s/4066668/developerconsole/apps/1085612/apiCredentials)
- [Search Experience](https://www.yext.com/s/4066668/search/experiences/configuration/knowledge-base/details)
- [Auth Policy](https://www.yext.com/adminconsole/resources?sourceAccountId=4066668&organizeByResourceType=true#pages/authentication-policy/knowledge-base-with-token.json)


## Overview


1. Configure Knowledge Graph
2. Configure OIDC Provider
3. Configure Auth Policy
4. Update config.yaml
5. Update src/templates
6. Deploy to Yext
7. Test

### Set Up Knowledge Graph
First you'll need to set up your Knowledge Graph.

If you're working in an empty demo account, feel free to apply these configuration files to set your account up with test data. This will apply the following:
- Custom Entity Types
- Custom Fields
- Custom Entities
- Authorized Search Experience


### Authentication Policy