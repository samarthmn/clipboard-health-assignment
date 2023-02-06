# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#### Asumptions:

- Database is relational database (MySQL, Postgres, etc)
- Time Estimate are random
- The user has UI to create/update Agents

Ticket 1:

    Title: Add the ability for the user to save custom ids for each Agents [Backend]

    Description: The user should be able to save custom ids for each Agents. This will be used when generating reports for the user.

    Tasks needed to complete: - [ ] Add a new column to the "Agents" table called "customId" which is nullable - [ ] update the "createAgent" / "updateAgent" functions to save the custom id in the database

    Acceptance Criteria:
    - [ ] The user should be able to save custom ids using the "createAgent" / "updateAgent" functions

    Time Estimate: 1 hour

Ticket 2:

    Title: Update Agent form to include customId [Frontend]

    Description: The user should be able to save custom ids using the "createAgent" / "updateAgent" functions

    Tasks needed to complete: - [ ] Add a new input field to called "customId" - [ ] Use "customId" to while creating/updating the agent, so that the custom id is saved in the database

    Acceptance Criteria:
    - [ ] The user should be able to create / update Agents with custom ids

    Time Estimate: 1 hour

Ticket 3:

    Title: Update "getShiftsByFacility" function to use customId [Backend]

    Description: The "getShiftsByFacility" function should use the custom id instead of the internal database id. If the custom id is not present, it should use the internal database id. custom id should be attached to the Shifts object.

    Tasks needed to complete: - [ ] Update the "getShiftsByFacility" function should fetch shifts from the database with the custom id or the internal database id (if the custom id is not present)

    Acceptance Criteria:
    - [ ] The "getShiftsByFacility" function should fetch shifts from the database with the custom id or the internal database id (if the custom id is not present)

    Time Estimate: 1 hour

Ticket 4:

    Title: Update "generateReport" function to use customId [Backend]

    Description: while generating report "generateReport function should use the custom id if present, otherwise it should use the internal database id.

    Tasks needed to complete: - [ ] Update the "generateReport" function should use the custom id if present, otherwise it should use the internal database id.

    Acceptance Criteria:
    - [ ] The "generateReport" function should generate report with the custom id if present, otherwise it should use the internal database id.
