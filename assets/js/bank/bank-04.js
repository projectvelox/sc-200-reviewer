/* SC-200 question bank, part 4: questions 49 to 64 of the reference PDF. */
window.EXAM.questions.push(
  {
    id: "Q049", source: 49, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with Azure AD.",
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender 365.",
      "You need to identify all the interactive authentication attempts by the users in the finance department of your company.",
      "How should you complete the KQL query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `{{f1}}
| where Department == 'Finance'
| project-rename objid = AccountObjectId
| join {{f2}} on $left.objid == $right.AccountObjectId`,
    fields: [
      { id: "f1", label: "Table to start from", options: ["BehaviorAnalytics", "IdentityInfo", "IdentityQueryEvents"] },
      { id: "f2", label: "Table to join", options: ["AuditLogs", "IdentityLogonEvents", "SigninLogs"] }
    ],
    answer: { f1: 1, f2: 1 },
    explanation: {
      correct: [
        "The first table is filtered on `Department`, which is an account attribute. `IdentityInfo` is the advanced hunting table of account information from Azure AD and Active Directory, including the department, the job title and `AccountObjectId`, so it supplies the finance users.",
        "Their sign-ins come from `IdentityLogonEvents`, which records authentication activity from on-premises Active Directory, captured by Defender for Identity, and from Microsoft online services, with a logon type that identifies interactive attempts. It has an `AccountObjectId` column, which is what the join condition uses."
      ],
      wrong: [
        ["BehaviorAnalytics", "This is a Microsoft Sentinel UEBA table in a Log Analytics workspace. It is not where advanced hunting keeps the department of a user."],
        ["IdentityQueryEvents", "This table records LDAP, DNS and similar queries. It has no department attribute."],
        ["AuditLogs", "This is the Azure AD audit log of directory changes in a Log Analytics workspace, not a record of authentication attempts."],
        ["SigninLogs", "This is the Azure AD sign-in log in a Log Analytics workspace. It does not cover on-premises AD DS authentication, and it identifies the user with `UserId`, not `AccountObjectId`."]
      ],
      concept: "`IdentityInfo` supplies who the users are, `IdentityLogonEvents` supplies their authentication activity, and the two are joined on the account object ID.",
      takeaway: "Filter on an attribute such as department in `IdentityInfo`, then join to `IdentityLogonEvents` for the sign-ins.",
      refs: [
        ["Microsoft Learn: IdentityInfo table", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-identityinfo-table"],
        ["Microsoft Learn: IdentityLogonEvents table", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-identitylogonevents-table"]
      ]
    }
  },
  {
    id: "Q050", source: 50, type: "single",
    domain: "respond", topic: "Incident investigation", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Endpoint.",
      "You need to identify any devices that triggered a malware alert and collect evidence related to the alert. The solution must ensure that you can use the results to initiate device isolation for the affected devices.",
      "What should you use in the Microsoft 365 Defender portal?"
    ],
    options: [
      { key: "A", text: "incidents" },
      { key: "B", text: "Remediation" },
      { key: "C", text: "Investigations" },
      { key: "D", text: "Advanced hunting" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "An incident collects the related alerts and everything that is known about them. The incident for the malware alert shows the devices involved, the evidence gathered for the alert and the attack story. From the incident you can open a device and take response actions on it, including isolate device, so the same place serves the investigation and the response."
      ],
      wrong: [
        ["B", "Remediation tracks the remediation activities for security recommendations. It does not show alerts and their evidence."],
        ["C", "Investigations lists automated investigations. That is one part of what an incident shows, not the view of the affected devices and all the evidence."],
        ["D", "With advanced hunting you would have to write queries to rebuild what the incident already shows, which is more work to reach the same devices."]
      ],
      concept: "Incidents group alerts, assets and evidence, and they are the starting point for response actions on devices.",
      takeaway: "Affected devices, evidence and response in one place: the incident.",
      refs: [
        ["Microsoft Learn: Investigate incidents in the Microsoft Defender portal", "https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents"],
        ["Microsoft Learn: Take response actions on a device", "https://learn.microsoft.com/en-us/defender-endpoint/respond-machine-alerts"]
      ]
    }
  },
  {
    id: "Q051", source: 51, type: "dropdown",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Purview and contains a user named User1.",
      "User1 shares a Microsoft Power BI report file from the Microsoft OneDrive folder of your company to an external user by using Microsoft Teams.",
      "You need to identify which Power BI report file was shared.",
      "How should you configure the search? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Activities:", options: ["Copied file", "Downloaded files to computer", "Share file, folder, or site", "Shared Power BI report"] },
      { id: "f2", label: "Record type:", options: ["MicrosoftTeams", "OneDrive", "PowerBiAudit", "Shared Power BI report"] },
      { id: "f3", label: "Workload:", options: ["MicrosoftTeams", "OneDrive", "PowerBi", "SharePoint"] }
    ],
    answer: { f1: 2, f2: 3, f3: 0 },
    explanation: {
      correct: [
        "The reference answer is **Share file, folder, or site** for Activities, **Shared Power BI report** for Record type and **MicrosoftTeams** for Workload.",
        "An audit search in Microsoft Purview is narrowed by the activity that was performed, by the record type and by the workload in which the activity took place. What User1 shared is a file stored in OneDrive, and sharing a stored file with another person is audited as the file sharing activity Share file, folder, or site. The audit record names the file that was shared. The reference answer combines that activity with the Power BI report record type and the Teams workload, because the item is a Power BI report file and Teams is where User1 shared it."
      ],
      wrong: [
        ["Copied file", "A copy creates another file. No one else gains access through it."],
        ["Downloaded files to computer", "This records a download by the user, not access given to an external user."],
        ["Shared Power BI report as the activity", "This activity is logged when a report is shared from the Power BI service. Here a file in a OneDrive folder was shared."]
      ],
      concept: "The audit log is searched by activity, record type and workload, and each audit record names the object that the activity was performed on.",
      takeaway: "To find which stored file was shared, search the audit log for the file sharing activity.",
      refs: [
        ["Microsoft Learn: Search the audit log", "https://learn.microsoft.com/en-us/purview/audit-search"],
        ["Microsoft Learn: Audit log activities", "https://learn.microsoft.com/en-us/purview/audit-log-activities"]
      ]
    }
  },
  {
    id: "Q052", source: 52, type: "order",
    domain: "respond", topic: "Defender for Identity", difficulty: "Intermediate",
    caseId: "case-litware", caseOrder: 1,
    stem: [
      "You need to configure DC1 to meet the business requirements.",
      "Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Provide domain administrator credentials to the litware.com Active Directory domain.",
      "Create an instance of Microsoft Defender for Identity.",
      "Provide global administrator credentials to the litware.com Azure AD tenant.",
      "Install the sensor on DC1.",
      "Install the standalone sensor on DC1."
    ],
    answer: [1, 0, 3],
    explanation: {
      correct: [
        "The business requirement is that all domain controllers must be protected by using Microsoft Defender for Identity, and DC1 is a domain controller that connects directly to the internet.",
        "Deployment starts with creating the Defender for Identity instance for the tenant. The instance is then connected to the on-premises forest by supplying credentials for the litware.com Active Directory domain, which are used to read the directory. With that in place, you download the sensor installer and install the sensor directly on DC1, where it monitors the traffic and events of the domain controller and sends them to the service."
      ],
      wrong: [
        ["Provide global administrator credentials to the litware.com Azure AD tenant", "This is not one of the three steps in the reference sequence. The credentials that the instance is given are for the on-premises Active Directory domain that it has to read."],
        ["Install the standalone sensor on DC1", "The standalone sensor is installed on a separate server that receives mirrored traffic from the domain controllers. DC1 can reach the internet, so the sensor is installed on the domain controller itself."],
        ["Installing the sensor first", "The sensor is downloaded from the instance and reports to it, so the instance and its connection to the domain come before the installation."]
      ],
      concept: "Defender for Identity is deployed by creating the instance, connecting it to Active Directory and installing sensors on the domain controllers.",
      takeaway: "A domain controller with internet access gets the regular sensor. The standalone sensor is for a separate server with port mirroring.",
      refs: [["Microsoft Learn: Deploy Microsoft Defender for Identity sensors", "https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity"]]
    }
  },
  {
    id: "Q053", source: 53, type: "single",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Purview and Microsoft Teams.",
      "You have a team named Team1 that has a project named Project1.",
      "You need to identify any Project1 files that were stored on the team site of Team1 between February 1, 2023, and February 10, 2023.",
      "Which KQL query should you run?"
    ],
    options: [
      { key: "A", code: `(c:c)(Project1)(date=(2023-02-01)..date=(2023-02-10))` },
      { key: "B", code: `AuditLogs
| where Timestamp between (datetime(2023-02-01)..datetime(2023-02-10))
| where FileName contains "Project1"` },
      { key: "C", code: `Project1(c:c)(date=2023-02-01..2023-02-10)` },
      { key: "D", code: `AuditLogs
| where Timestamp > ago(10d)
| where FileName contains "Project1"` }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Files on a team site are found with a content search in Microsoft Purview, and content searches use Keyword Query Language, not Kusto. A keyword query is a keyword followed by conditions: `Project1` is the keyword, `(c:c)` is the separator that the search tool places between the keyword and each condition, and `date=2023-02-01..2023-02-10` is a date condition in which the two dots define the range from the first date to the second."
      ],
      wrong: [
        ["A", "This puts the separator before the keyword and repeats `date=` with parentheses around each value. A date range is written once, as `date=start..end`."],
        ["B", "This is Kusto syntax against a log table. It queries audit data in a Log Analytics workspace, not the content of a SharePoint site."],
        ["D", "This is also Kusto, and `ago(10d)` counts back from today, not from the fixed dates in February 2023."]
      ],
      concept: "In Microsoft Purview, KQL means Keyword Query Language: keywords, property:value pairs, and ranges written with two dots.",
      takeaway: "A content search query has the form keyword(c:c)(condition), and a date range is written `date=start..end`.",
      logic: "Two options start with a table name and pipes, which is Kusto and cannot be a content search. Of the other two, only one starts with the keyword.",
      refs: [["Microsoft Learn: Keyword queries and search conditions for eDiscovery", "https://learn.microsoft.com/en-us/purview/ediscovery-keyword-queries-and-search-conditions"]]
    }
  },
  {
    id: "Q054", source: 54, type: "single",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Endpoint.",
      "You need to create a query that will link the AlertInfo, AlertEvidence, and DeviceLogonEvents tables. The solution must return all the rows in the tables.",
      "Which operator should you use?"
    ],
    options: [
      { key: "A", text: "`search *`" },
      { key: "B", text: "`union kind = inner`" },
      { key: "C", text: "`join kind = inner`" },
      { key: "D", text: "`evaluate hint.remote =`" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The reference answer is `union kind = inner`. `union` takes two or more tables and returns the rows of all of them, so every row of `AlertInfo`, `AlertEvidence` and `DeviceLogonEvents` is in the result. The `kind` argument only affects the columns: `inner` keeps the columns that all the tables have in common, and the default `outer` keeps every column of every table."
      ],
      wrong: [
        ["A", "`search *` looks for a term across tables and columns. It searches for a value and is not a way to combine three named tables."],
        ["C", "An inner join returns only the rows that have a match on the join key in both tables, so rows without a match are dropped, and it links two tables at a time."],
        ["D", "`evaluate` runs a query plug-in, and `hint.remote` only tells it where to run. Neither combines tables."]
      ],
      concept: "`union` returns all rows of its tables and `kind` chooses the columns. `join` returns matched rows and `kind` chooses which unmatched rows survive.",
      takeaway: "All rows of several tables: `union`. Matching rows between tables: `join`.",
      refs: [["Microsoft Learn: union operator", "https://learn.microsoft.com/en-us/kusto/query/union-operator"]]
    }
  },
  {
    id: "Q055", source: 55, type: "single",
    domain: "ops", topic: "Roles and device groups", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains 100 Windows 10 devices.",
      "You onboard the devices to Microsoft Defender 365.",
      "You need to ensure that you can initiate remote shell connections to the onboarded devices from the Microsoft 365 Defender portal.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Modify the permissions for Microsoft 365 Defender." },
      { key: "B", text: "Create a device group." },
      { key: "C", text: "From Advanced features in the Endpoints settings of the Microsoft 365 Defender portal, enable automated investigation." },
      { key: "D", text: "Configure role-based access control (RBAC)." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The reference answer is D. Remote shell connections are live response sessions, and only users who have been given the live response permission can start one. That permission, Live response capabilities, is part of a Defender for Endpoint role, and roles exist only after role-based access control has been configured for Defender for Endpoint. Configuring RBAC and assigning a role that includes live response is therefore the starting point."
      ],
      wrong: [
        ["A", "The permission that controls live response is a Defender for Endpoint role permission that is set through RBAC. The reference answer names that mechanism."],
        ["B", "A device group organizes devices and sets their automation level. It gives no one the right to open a session."],
        ["C", "Automated investigation lets Defender investigate alerts by itself. It is not the setting that allows an analyst to connect to a device."]
      ],
      concept: "Live response is governed by a permission in Defender for Endpoint roles, so access to it is granted through RBAC.",
      takeaway: "Who may start a live response session is decided by RBAC roles in Defender for Endpoint.",
      refs: [
        ["Microsoft Learn: Investigate entities on devices using live response", "https://learn.microsoft.com/en-us/defender-endpoint/live-response"],
        ["Microsoft Learn: Create and manage roles for role-based access control", "https://learn.microsoft.com/en-us/defender-endpoint/user-roles"]
      ]
    }
  },
  {
    id: "Q056", source: 56, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Endpoint.",
      "You need to create a detection rule that meets the following requirements:",
      { list: [
        "Is triggered when a device that has critical software vulnerabilities was active during the last hour",
        "Limits the number of duplicate results"
      ] },
      "How should you complete the KQL query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `DeviceTvmSoftwareVulnerabilities
| where VulnerabilitySeverityLevel == 'Critical'
{{f1}}
| join kind=inner DeviceInfo on DeviceId
| where Timestamp between (now(-1h)..now())
{{f2}}`,
    fields: [
      { id: "f1", label: "Line after the severity filter", options: [
        "| distinct CveId",
        "| distinct DeviceId",
        "| project-away CveId",
        "| project-keep DeviceId"
      ] },
      { id: "f2", label: "Last line of the query", options: [
        "| distinct DeviceId",
        "| distinct DeviceId, ReportId",
        "| project Timestamp, DeviceId, ReportId",
        "| summarize count() by DeviceId, ReportId"
      ] }
    ],
    answer: { f1: 1, f2: 2 },
    explanation: {
      correct: [
        "`DeviceTvmSoftwareVulnerabilities` has one row for every vulnerability on every device, so a device with many critical vulnerabilities appears many times. `| distinct DeviceId` reduces the rows to one for each device before the join, which is what limits duplicate results.",
        "The join with `DeviceInfo` and the time filter keep the devices that reported in during the last hour. A query that is used in a custom detection rule must return `Timestamp`, `DeviceId` and `ReportId`, and `| project Timestamp, DeviceId, ReportId` returns exactly those columns."
      ],
      wrong: [
        ["| distinct CveId", "This returns one row for each vulnerability and drops `DeviceId`, so the join on `DeviceId` has nothing to match."],
        ["| project-away CveId", "This removes one column but leaves a row for every vulnerability, so the duplicates remain."],
        ["| project-keep DeviceId", "This keeps the right column but still returns one row for every vulnerability."],
        ["| distinct DeviceId or | distinct DeviceId, ReportId as the last line", "Both drop `Timestamp`, which a detection rule requires."],
        ["| summarize count() by DeviceId, ReportId", "This returns counts without `Timestamp`."]
      ],
      concept: "`distinct` removes duplicates, and a detection rule on device data needs `Timestamp`, `DeviceId` and `ReportId` in the final output.",
      takeaway: "One row for each device: `distinct DeviceId`. The output of a detection rule: `project Timestamp, DeviceId, ReportId`.",
      refs: [
        ["Microsoft Learn: Create custom detection rules", "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules"],
        ["Microsoft Learn: DeviceTvmSoftwareVulnerabilities table", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-devicetvmsoftwarevulnerabilities-table"]
      ]
    }
  },
  {
    id: "Q057", source: 57, type: "dropdown",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Teams.",
      "You need to perform a content search of Teams chats for a user by using the Microsoft Purview compliance portal. The solution must minimize the scope of the search.",
      "How should you configure the content search? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Locations:", options: ["Exchange mailboxes", "Exchange public folders", "SharePoint sites"] },
      { id: "f2", label: "Keywords:", options: ["Category", "ItemClass", "Kind"] }
    ],
    answer: { f1: 0, f2: 2 },
    explanation: {
      correct: [
        "Teams chat messages are stored for compliance in a hidden folder of the mailbox of each user who takes part in the chat. To search the chats of a user you therefore search **Exchange mailboxes**, limited to the mailbox of that user.",
        "A mailbox also holds email, calendar items and contacts. The `Kind` property restricts the search to one kind of item, and `kind:microsoftteams` returns only Teams chats and channel messages, which keeps the scope as small as possible."
      ],
      wrong: [
        ["Exchange public folders", "Public folders are shared folders. Chats are not stored there."],
        ["SharePoint sites", "SharePoint holds files that are shared in channels, not the chat messages themselves."],
        ["Category", "This searches the categories that users assign to items in Outlook."],
        ["ItemClass", "This is used to search third-party data types that were imported into Microsoft 365."]
      ],
      concept: "Compliance copies of Teams messages are kept in Exchange mailboxes, and the `kind` property filters a search by item type.",
      takeaway: "Teams chats of a user: search the mailbox of the user with `kind:microsoftteams`.",
      refs: [
        ["Microsoft Learn: Keyword queries and search conditions for eDiscovery", "https://learn.microsoft.com/en-us/purview/ediscovery-keyword-queries-and-search-conditions"],
        ["Microsoft Learn: Get started with Content search", "https://learn.microsoft.com/en-us/purview/ediscovery-content-search"]
      ]
    }
  },
  {
    id: "Q058", source: 58, type: "single",
    domain: "respond", topic: "Response actions", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains 100 Linux devices. The devices are onboarded to Microsoft Defender 365.",
      "You need to initiate the collection of investigation packages from the devices by using the Microsoft 365 Defender portal.",
      "Which response action should you use?"
    ],
    options: [
      { key: "A", text: "Run antivirus scan" },
      { key: "B", text: "Initiate Automated Investigation" },
      { key: "C", text: "Collect investigation package" },
      { key: "D", text: "Initiate Live Response Session" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "**Collect investigation package** is the device response action that gathers forensic data from a device, such as running processes, network connections, installed programs and logs, into a compressed file. When the collection is finished you download the package from the Action center. The action is available on the device page in the portal."
      ],
      wrong: [
        ["A", "This starts an antivirus scan on the device. It gathers nothing for you to download."],
        ["B", "This starts an automated investigation. It does not produce an investigation package."],
        ["D", "This opens a remote shell to one device, in which you run commands yourself. The dedicated action for obtaining the package is Collect investigation package."]
      ],
      concept: "Device response actions include isolate device, restrict app execution, run antivirus scan, collect investigation package and live response.",
      takeaway: "The response action for forensic data from a device is named after what it does: Collect investigation package.",
      refs: [["Microsoft Learn: Take response actions on a device", "https://learn.microsoft.com/en-us/defender-endpoint/respond-machine-alerts"]]
    }
  },
  {
    id: "Q059", source: 59, type: "multi",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Intermediate",
    stem: [
      "You need to configure Microsoft Defender for Cloud Apps to generate alerts and trigger remediation actions in response to external sharing of confidential files.",
      "Which two actions should you perform in the Microsoft 365 Defender portal? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "From Settings, select Cloud App, select Microsoft Information Protection, and then select Only scan files for Microsoft Information Protection sensitivity labels and content inspection warnings from this tenant." },
      { key: "B", text: "From Cloud apps, select Files, and then filter File Type to Document." },
      { key: "C", text: "From Settings, select Cloud App, select Microsoft Information Protection, select Files, and then enable file monitoring." },
      { key: "D", text: "From Cloud apps, select Files, and then filter App to Office 365." },
      { key: "E", text: "From Cloud apps, select Files, and then select New policy from search." },
      { key: "F", text: "From Settings, select Cloud App, select Microsoft Information Protection, and then select Automatically scan new files for Microsoft Information Protection sensitivity labels and content inspection warnings." }
    ],
    answer: ["C", "F"],
    explanation: {
      correct: [
        "The reference answer is C and F, the two settings that must be on before Defender for Cloud Apps can act on confidential files. File monitoring makes Defender for Cloud Apps scan the files in connected apps, so that file policies have data to evaluate (C).",
        "Automatically scanning new files for Microsoft Information Protection sensitivity labels (F) makes the label of each file available as a policy condition. A file policy can then match files that are labelled as confidential and shared externally, raise an alert and apply a governance action."
      ],
      wrong: [
        ["A", "This limits label scanning to labels set in your own tenant. It is an optional narrowing and does not start the scanning of new files."],
        ["B", "Filtering by file type only changes what the Files page shows."],
        ["D", "Filtering by app only changes what the Files page shows."],
        ["E", "A policy created from a file search depends on file monitoring and label scanning being enabled. In this version of the question the reference answer selects those two settings."]
      ],
      concept: "File policies depend on file monitoring and, for label conditions, on the scanning of sensitivity labels.",
      takeaway: "Two prerequisites for acting on labelled files: file monitoring and automatic label scanning.",
      refs: [
        ["Microsoft Learn: File policies in Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies"],
        ["Microsoft Learn: Integrate Microsoft Purview sensitivity labels with Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/azip-integration"]
      ]
    }
  },
  {
    id: "Q060", source: 60, type: "single",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Purview.",
      "Your company has a project named Project1.",
      "You need to identify all the email messages that have the word Project1 in the subject line. The solution must search only the mailboxes of users that worked on Project1.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Perform a user data search." },
      { key: "B", text: "Create a records management disposition." },
      { key: "C", text: "Perform an audit search." },
      { key: "D", text: "Perform a content search." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "A content search looks inside the items in the locations that you choose. You select the mailboxes of the users who worked on Project1 as the locations, so nothing else is searched, and you use a query on the subject property, `subject:Project1`, to return only the messages with that word in the subject line."
      ],
      wrong: [
        ["A", "A user data search is the tool for data subject requests. It gathers the personal data of one individual, not messages about a project across several mailboxes."],
        ["B", "Disposition is the review of items at the end of their retention period. It is not a search for messages."],
        ["C", "An audit search returns records of activities, that is, who did what and when. It does not return the messages themselves."]
      ],
      concept: "Content search finds items by keyword and property in chosen mailboxes and sites, while audit search finds records of activity.",
      takeaway: "Find messages by subject in specific mailboxes with a content search.",
      refs: [
        ["Microsoft Learn: Get started with Content search", "https://learn.microsoft.com/en-us/purview/ediscovery-content-search"],
        ["Microsoft Learn: Keyword queries and search conditions for eDiscovery", "https://learn.microsoft.com/en-us/purview/ediscovery-keyword-queries-and-search-conditions"]
      ]
    }
  },
  {
    id: "Q061", source: 61, type: "multi",
    domain: "ops", topic: "Alert tuning and detections", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Defender XDR.",
      "You discover that when Microsoft Defender for Endpoint generates alerts for a commonly used executable file, it causes alert fatigue.",
      "You need to tune the alerts.",
      "Which two actions can an alert tuning rule perform for the alerts? Each correct answer presents a complete solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "delete" },
      { key: "B", text: "hide" },
      { key: "C", text: "resolve" },
      { key: "D", text: "merge" },
      { key: "E", text: "assign" }
    ],
    answer: ["B", "C"],
    explanation: {
      correct: [
        "An alert tuning rule, previously called a suppression rule, defines conditions for alerts that you already understand and applies one of two actions to the alerts that match. It can **hide** the alert, so that it does not appear in the queue, or **resolve** it automatically, so that it is closed without work by an analyst. Either action stops the alerts for the common executable from adding to the workload."
      ],
      wrong: [
        ["A", "Alerts are not deleted by a tuning rule. Hidden alerts are still kept."],
        ["D", "Merging is done to incidents. It is not an action of a tuning rule."],
        ["E", "An assigned alert still has to be handled by someone. Assignment is not an action of a tuning rule."]
      ],
      concept: "Alert tuning rules match alerts by their evidence and conditions and then hide or resolve them.",
      takeaway: "An alert tuning rule has two actions: hide or resolve.",
      refs: [["Microsoft Learn: Investigate alerts in Microsoft Defender XDR", "https://learn.microsoft.com/en-us/defender-xdr/investigate-alerts"]]
    }
  },
  {
    id: "Q062", source: 62, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    caseId: "set-passive-av", caseOrder: 1,
    stem: [
      "Solution: You configure endpoint detection and response (EDR) in block mode.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "With a third-party antivirus product as the primary one, Microsoft Defender Antivirus runs in passive mode: it scans and reports, but its remediation is not active. EDR in block mode changes that for detections made after a breach. When the EDR capability of Defender for Endpoint detects a malicious artifact that the primary antivirus product missed, Microsoft Defender Antivirus is allowed to block and remediate it, even though it stays in passive mode. That is the protection the goal asks for."
      ],
      wrong: [
        ["B", "EDR in block mode exists for exactly this configuration, a non-Microsoft primary antivirus product with Defender Antivirus in passive mode."]
      ],
      concept: "EDR in block mode lets Defender Antivirus remediate artifacts found by EDR, also when another product is the primary antivirus.",
      takeaway: "Third-party antivirus and Defender in passive mode: EDR in block mode closes the gap.",
      refs: [["Microsoft Learn: Endpoint detection and response in block mode", "https://learn.microsoft.com/en-us/defender-endpoint/edr-in-block-mode"]]
    }
  },
  {
    id: "Q063", source: 63, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    caseId: "set-passive-av", caseOrder: 2,
    stem: [
      "Solution: You configure Controlled folder access.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Controlled folder access protects the files in designated folders from being changed by untrusted applications, mainly as a defense against ransomware. It depends on the real-time protection of Microsoft Defender Antivirus, which is not active when Defender Antivirus is in passive mode, and it does not detect or remediate artifacts that the third-party antivirus product missed. The setting that meets the goal is EDR in block mode."
      ],
      wrong: [
        ["A", "Controlled folder access guards folders against changes. It is not a way to find and remove malicious artifacts, and it needs Defender Antivirus to be the active antivirus."]
      ],
      concept: "Controlled folder access is a ransomware protection feature that requires Microsoft Defender Antivirus real-time protection.",
      takeaway: "Controlled folder access protects folders. It does not catch what another antivirus product misses.",
      refs: [
        ["Microsoft Learn: Protect folders from ransomware with controlled folder access", "https://learn.microsoft.com/en-us/defender-endpoint/controlled-folder-access-overview"],
        ["Microsoft Learn: Endpoint detection and response in block mode", "https://learn.microsoft.com/en-us/defender-endpoint/edr-in-block-mode"]
      ]
    }
  },
  {
    id: "Q064", source: 64, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    caseId: "set-passive-av", caseOrder: 3,
    stem: [
      "Solution: You enable automated investigation and response (AIR).",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The reference answer is No. Automated investigation and response examines the alerts that Defender for Endpoint raises and decides which remediation actions to take or to propose for approval. It is an investigation and response workflow. It is not the protection layer that blocks a malicious artifact on a device where another product is the primary antivirus and Microsoft Defender Antivirus only runs in passive mode.",
        "The capability that Microsoft documents for exactly that configuration is EDR in block mode, which lets Microsoft Defender Antivirus block and remediate artifacts detected by EDR even though it stays in passive mode."
      ],
      wrong: [
        ["A", "AIR automates the investigation of alerts. Enabling it does not change the passive mode of Defender Antivirus, and it is not the setting that Microsoft provides for artifacts missed by a third-party antivirus product."]
      ],
      concept: "AIR automates investigation and remediation decisions, while blocking on a device with a third-party antivirus product is provided by EDR in block mode.",
      takeaway: "AIR alone is not enough in passive mode. Pair it with EDR in block mode.",
      refs: [
        ["Microsoft Learn: Endpoint detection and response in block mode", "https://learn.microsoft.com/en-us/defender-endpoint/edr-in-block-mode"],
        ["Microsoft Learn: Use automated investigations to investigate and remediate threats", "https://learn.microsoft.com/en-us/defender-endpoint/automated-investigations"]
      ]
    }
  }
);
