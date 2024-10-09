# Table of Contents

- [Demo](#demo)
- [Defender Ecosystem](#defender-ecosystem)
- [Overview](#overview)
- [Production Services](#production-services)
  - [Defender.Portal](#defenderportal)
  - [Defender.IdentityService](#defenderidentityservice)
  - [Defender.UserManagementService](#defenderusermanagementservice)
  - [Defender.NotificationService](#defendernotificationservice)
  - [Defender.WalletService](#defenderwalletservice)
  - [Defender.RiskGamesService](#defenderriskgamesservice)
  - [Defender.BudgetTracker](#defenderbudgettracker)
- [Libraries](#libraries)
  - [Defender.Common](#defendercommon)
  - [Defender.Mongo.MessageBroker](#defendermongomessagebroker)
- [Other Services](#other-services)
  - [Defender.ServiceTemplate](#defenderservicetemplate)
  - [Defender.GeneralTestingService](#defendergeneraltestingservice)
  - [Defender.JobSchedulerService](#defenderjobschedulerservice)
  - [Defender.SecretManagementService](#defendersecretmanagementservice)
  - [Defender.SimpleMongoMigrator](#defendersimplemongomigrator)
  - [Defender.WalutomatHelperService](#defenderwalutomathelperservice)
- [Conclusion](#conclusion)
- [License](#license)

# Demo

https://defender-portal.duckdns.org/welcome/login
login: demo@demo.com
password: demo2024

**Note: Please do not change the password or email for this demo account.**

# Defender Ecosystem

The Defender ecosystem is a collection of services and utilities designed to work together to provide a comprehensive solution for various needs. The idea is to make it easy to implement new services and features. Below is an overview of each component in the ecosystem.

# Overview

- Everything is hosted on my home server, ensuring 24/7 availability (barring any power outages). If something is broken, please let me know at my email: sdanilev@gmail.com.
- Hosting is managed using Docker and Docker Compose.
- Authorization between all services is handled via JWT tokens with role-based access control. The roles include Guest, User, Admin, and SuperAdmin.
- The portal includes administrative pages for Admin and SuperAdmin roles to manage users, their wallets, and more.
- HTTP calls are used for service communication, as the initial idea was to open all services for public use. HTTP API with OpenAPI specification is the best option for this.
- A custom message broker based on MongoDB is used for transaction reliability.
- The front-end is fully responsive, and optimized for mobile phones, laptops, and large screens.
- The front end is built using React with MUI components, chosen for their aesthetic appeal and comprehensive documentation.
- Google authorization is implemented for faster account creation and login.
- This is the third version of the ecosystem, with significant architectural improvements over the first two attempts.
- About half of the services are not used by the BFF and were created to simplify system management.
- The front end includes localization support, allowing users who are not proficient in English, such as my parents, to use it easily. Adding more languages is straightforward and requires minimal effort.
- The entire project was developed during my weekends and some evenings.
- A service template has been created to streamline the process of developing new services, ensuring consistency and adherence to best practices across the ecosystem.
- The ecosystem integrates with two third-party services: one for sending emails and another for retrieving historical exchange rates.

## Production Services

### [Defender.Portal](https://github.com/SelDanilEv/Defender.Portal)

The main portal for accessing Defender services. It consists of a frontend built with React and a backend-for-frontend (BFF) service that handles API requests and integrates with other Defender services.

### [Defender.IdentityService](https://github.com/SelDanilEv/Defender.IdentityService)

Manages user identities and authentication, providing JWT tokens, role management, and access code administration and verification.

### [Defender.UserManagementService](https://github.com/SelDanilEv/Defender.UserManagementService)

Manages user accounts and profiles.

### [Defender.NotificationService](https://github.com/SelDanilEv/Defender.NotificationService)

Handles sending email notifications to users.

### [Defender.WalletService](https://github.com/SelDanilEv/Defender.WalletService)

Manages user balances, currency accounts, and all types of transactions. Utilizes a queue-based system to ensure reliable transaction processing. In case of infrastructure issues, failed transactions are placed in a retry queue to be processed later, ensuring eventual consistency.

### [Defender.RiskGamesService](https://github.com/SelDanilEv/Defender.RiskGamesService)

A service for managing and running risk-related games, currently supporting only lottery. It features a highly flexible API for creating and managing lotteries, as well as calculating expected revenue.

### [Defender.BudgetTracker](https://github.com/SelDanilEv/Defender.BudgetTracker)

A service for tracking and managing budgets. It includes three types of entities:

- **Position**: Represents where your money is stored, e.g., **Bank PKO** or **Wallet**.
- **Review**: Allows you to review all your positions and assign an amount of money to each position.
- **Groups**: Enables you to filter, show/hide, or highlight specific groups of positions. You can create dedicated groups for these positions and mark them on the diagram.

## Libraries

### [Defender.Common](https://github.com/SelDanilEv/Defender.Common)

Provides common utilities and shared code used across multiple Defender services. This library can also be utilized by external services to integrate with the Defender ecosystem. In the future, it will be split into several packages to enhance modularity, but currently, it remains a single package to expedite development.

### [Defender.Mongo.MessageBroker](https://github.com/SelDanilEv/Defender.Mongo.MessageBroker)

A custom message broker built using MongoDB collections and cursors. It serves as a lightweight and cost-effective alternative to traditional message brokers, providing reliable message queuing and processing capabilities.

## Other Services

### [Defender.ServiceTemplate](https://github.com/SelDanilEv/Defender.ServiceTemplate)

A template for creating new services within the Defender ecosystem. It includes detailed steps on how to configure and set up a new service, ensuring consistency and adherence to best practices across all Defender services.

### [Defender.GeneralTestingService](https://github.com/SelDanilEv/Defender.GeneralTestingService)

A service dedicated to general testing functionalities. Primarily used for end-to-end testing to ensure that all functionalities are working correctly before a release. It helps in identifying and fixing issues early in the development cycle, ensuring a stable and reliable product.

### [Defender.JobSchedulerService](https://github.com/SelDanilEv/Defender.JobSchedulerService)

Schedules and manages background jobs and tasks.

### [Defender.SecretManagementService](https://github.com/SelDanilEv/Defender.SecretManagementService)

Manages secrets and sensitive information.

### [Defender.SimpleMongoMigrator](https://github.com/SelDanilEv/Defender.SimpleMongoMigrator)

A straightforward tool for migrating MongoDB databases across different environments. It supports schema changes, data transformations, and ensures data integrity during the migration process. Ideal for seamless transitions between development, staging, and production environments.

### [Defender.WalutomatHelperService](https://github.com/SelDanilEv/Defender.WalutomatHelperService)

A service designed to set up automatic currency exchanges and create bots for Walutomat. This service is currently in development and aims to provide a robust API for automating trading activities, managing exchange rates, and executing trades based on predefined strategies.

## Conclusion

Thank you for your attention!
