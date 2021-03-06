# Financial Friendship

Made by: [Ryan Dalton](https://github.com/DaltonR121)

Manage your finances at [Financial Friendship](https://spacexchange.herokuapp.com/)

According to Charles Schwab's [2019 Modern Wealth Index Survey](https://www.aboutschwab.com/modernwealth2019), about 59% of adults in the U.S. admit to living paycheck to paycheck.  What is the best way to take control of your finances?  Be INVOLVED in your finances!  Financial Friendship is an application designed with the idea of manually updating the information here weekly or even daily!  Building a habit of knowing what is going on with your money is the best way to keep more of it!

## Index

- [API Documentation](https://github.com/DaltonR121/FinancialFriendship/wiki/API-Routes)
- [Database Schema](https://github.com/DaltonR121/FinancialFriendship/wiki/Database-Schema)
- [Frontend Routes](https://github.com/DaltonR121/FinancialFriendship/wiki/Frontend-Routes)
- [MVP Feature List](https://github.com/DaltonR121/FinancialFriendship/wiki/MVP-Feature-List)
- [User Stories](https://github.com/DaltonR121/FinancialFriendship/wiki/User-Stories)

## Technologies Used

- JavaScript
- React/Redux
- Chart.js
- CSS
- Python
- Flask/SQLAlchemy

## Overview

The idea for Financial Friendship came from a spreadsheet I actually keep for my own family's finances.  It occurred to me that the more often I updated that spreadsheet, the more in-tune I felt with our finances.  This application is essentially modeled after that spreadsheet!  When a user first accesses the application, they are greeted by the splash page with links to Login or Signup.

![](assets/splash.png)

After logging into the site, the user lands on their portfolio!  The portfolio page includes data visualization for "Assets", "Accounts", and "Debt".  This data is a summation of data input by the user across the rest of the application.  The user can hover over specific areas of the charts and see totals broken down by category.  The user also has the ability to remove categories from the visualization by clicking that specific category below the chart!

![](assets/portfolio.png)

The user has five specific areas to input data - "Accounts", "Assets", "Credit Cards", "Monthly Reoccurring", and "Other Obligations".  Across these pages, users can name accounts, input values, balances, an interest rate, limit, etc. depending upon what is appropriate for the category!

![](assets/accounts.png)

![](assets/assets.png)

![](assets/creditcards.png)

![](assets/monthly.png)

![](assets/other.png)

## What now? More bonuses!

- A chart that keeps track of "Historical Value" of a user's net worth over time
- A tool that will allow users to see how long it will take to get out of debt based upon current income/monthly expenses/level of debt
