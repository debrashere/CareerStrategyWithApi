# Career Strategy API Capstone
## Review findings

Thinkful (https://www.thinkful.com/) API Capstone Project providing API service to manage Job Search strategy.

Link to the live demo:  https://debrashere.github.io/CareerStrategyWithApi/index.html

### Summary
The first draft of this app uses some mock data in the Mongo database.
New users are able to create an account and create their own data.

I've reviewed this application with at least 2 people who would use this type of app. Following are my findings.
  #### What you can do:
    Manage data pertaining to jobs that you are researching or have applied for.
    You can save important information about your job search regardless of where you found the job.

    Each user will have their own login allowing them access to only their information.

  #### Overview of findings  - what users would like to do 

  * Have a less detail about the job prospects, instead have summary list of just the job name (what) and the company (where). Make the job name clickable and then display the details.  This makes it easier to display the job prospect on a small device such as an iPhone.
  * Add search options which will let you search for a job name or company.  This would be helpful when the list is long.
  * Create a cleaner more stylish index page.
  * Update the user profile page to be more stylish.
  * Center the form when user clicks on updates the job prospects.
    

### Examples of requested fixes

To find a job prospect:

```
  Search by job name:  Enter text that would match any text within the job name.
  Highlight or only show job prospects containing that text
```

```
  Search by company name:  Enter text that would match any text within the company name.
  Highlight or only show job prospects containing that text.
```
