/* SC-200 question bank, part 3: questions 33 to 48 of the reference PDF. */
window.EXAM.questions.push(
  {
    id: "Q033", source: 33, type: "single",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription. The subscription uses Microsoft 365 Defender and has data loss prevention (DLP) policies that have aggregated alerts configured.",
      "You need to identify the impacted entities in an aggregated alert.",
      "What should you review in the DLP alert management dashboard of the Microsoft 365 compliance center?"
    ],
    options: [
      { key: "A", text: "the Events tab of the alert" },
      { key: "B", text: "the Sensitive Info Types tab of the alert" },
      { key: "C", text: "Management log" },
      { key: "D", text: "the Details tab of the alert" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "An aggregated DLP alert is raised once for several rule matches. In the DLP alert management dashboard, the **Events** tab of the alert lists each event behind it, and each event shows the item, the user and the location involved. That list is where you identify the impacted entities."
      ],
      wrong: [
        ["B", "This tab shows which sensitive information types were detected, not which items and users were involved."],
        ["C", "The management log records what was done to the alert, such as status changes and comments."],
        ["D", "The Details tab summarizes the alert itself: policy, severity, time and status."]
      ],
      concept: "A DLP alert can stand for one event or for many aggregated events, and the events carry the affected item and user.",
      takeaway: "Who and what is behind an aggregated DLP alert: the Events tab.",
      refs: [["Microsoft Learn: Get started with the DLP Alerts dashboard", "https://learn.microsoft.com/en-us/purview/dlp-alerts-dashboard-get-started"]]
    }
  },
  {
    id: "Q034", source: 34, type: "single",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft 365 Defender.",
      "You plan to create a hunting query from Microsoft Defender.",
      "You need to create a custom tracked query that will be used to assess the threat status of the subscription.",
      "From the Microsoft 365 Defender portal, which page should you use to create the query?"
    ],
    options: [
      { key: "A", text: "Threat analytics" },
      { key: "B", text: "Advanced Hunting" },
      { key: "C", text: "Explorer" },
      { key: "D", text: "Policies & rules" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The reference answer is Advanced Hunting. Advanced hunting is the page of the Microsoft 365 Defender portal where you write custom queries in Kusto Query Language over the data of the subscription, save them, share them and turn them into detections."
      ],
      wrong: [
        ["A", "Threat analytics presents reports written by Microsoft researchers. You read them; you do not write queries there."],
        ["C", "Explorer works on email and collaboration threat data through a fixed set of filters, not through a hunting query language. The reference answer treats the query as a hunting query."],
        ["D", "Policies & rules is where policies and alert rules are managed, not queries."]
      ],
      concept: "Advanced hunting is the query-based threat hunting tool of the Defender portal.",
      takeaway: "A hunting query is created on the Advanced Hunting page.",
      refs: [["Microsoft Learn: Proactively hunt for threats with advanced hunting", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview"]]
    }
  },
  {
    id: "Q035", source: 35, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Defender for Endpoint.",
      "You need to add threat indicators for all the IP addresses in a range of 171.23.34.32-171.23.34.63. The solution must minimize administrative effort.",
      "What should you do in the Microsoft 365 Defender portal?"
    ],
    options: [
      { key: "A", text: "Create an import file that contains the individual IP addresses in the range. Select Import and import the file." },
      { key: "B", text: "Create an import file that contains the IP address of 171.23.34.32/27. Select Import and import the file." },
      { key: "C", text: "Select Add indicator and set the IP address to 171.23.34.32-171.23.34.63." },
      { key: "D", text: "Select Add indicator and set the IP address to 171.23.34.32/27." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "An IP address indicator in Defender for Endpoint holds a single IP address. CIDR blocks and address ranges are not accepted, either in the Add indicator form or in an import file. A range of 32 addresses therefore needs 32 indicators, and the way to create them with the least effort is to list the individual addresses in a CSV file and import the file in one operation."
      ],
      wrong: [
        ["B", "CIDR notation is not supported for indicators, so this import would not create indicators for the range."],
        ["C", "The Add indicator form takes one address, not a range with a start and an end."],
        ["D", "CIDR notation is not accepted in the Add indicator form either."]
      ],
      concept: "Defender for Endpoint IP indicators are single addresses, and bulk creation is done by importing a CSV file.",
      takeaway: "Many IP indicators: one address per row in an import file. No CIDR, no ranges.",
      refs: [
        ["Microsoft Learn: Create indicators for IPs and URLs/domains", "https://learn.microsoft.com/en-us/defender-endpoint/indicator-ip-domain"],
        ["Microsoft Learn: Manage indicators", "https://learn.microsoft.com/en-us/defender-endpoint/indicator-manage"]
      ]
    }
  },
  {
    id: "Q036", source: 36, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that uses Microsoft Defender for Endpoint.",
      "You need to ensure that you can allow or block a user-specified range of IP addressed and URLs.",
      "What should you enable first in the Advanced features from the Endpoints Settings in the Microsoft 365 Defender portal?"
    ],
    options: [
      { key: "A", text: "custom network indicators" },
      { key: "B", text: "live response for servers" },
      { key: "C", text: "endpoint detection and response (EDR) in block mode" },
      { key: "D", text: "web content filtering" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Indicators for IP addresses, URLs and domains are only enforced when the **Custom network indicators** advanced feature is on. It configures devices to allow or block connections to the addresses in your custom indicator lists, using network protection on the device, so it has to be enabled before the indicators have any effect."
      ],
      wrong: [
        ["B", "This enables live response sessions on servers. It does not allow or block network destinations."],
        ["C", "EDR in block mode remediates detections after a breach. It does not allow or block addresses that you specify."],
        ["D", "Web content filtering blocks websites by content category, not by your own list of IP addresses and URLs."]
      ],
      concept: "Network indicators depend on the Custom network indicators advanced feature and on network protection on the devices.",
      takeaway: "Before IP and URL indicators work, turn on Custom network indicators.",
      refs: [
        ["Microsoft Learn: Configure advanced features in Defender for Endpoint", "https://learn.microsoft.com/en-us/defender-endpoint/advanced-features"],
        ["Microsoft Learn: Create indicators for IPs and URLs/domains", "https://learn.microsoft.com/en-us/defender-endpoint/indicator-ip-domain"]
      ]
    }
  },
  {
    id: "Q037", source: 37, type: "dragdrop",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains the users shown in the following table.",
      { table: {
        head: ["Name", "Role"],
        rows: [
          ["User1", "Security administrator"],
          ["User2", "Security reader"],
          ["User3", "Contributor"]
        ]
      } },
      "You need to delegate the following tasks:",
      { list: [
        "Enable Microsoft Defender for Servers on virtual machines.",
        "Review security recommendations and enable server vulnerability scans."
      ] },
      "The solution must use the principle of least privilege.",
      "Which user should perform each task? To answer, drag the appropriate users to the correct tasks. Each user may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Users",
    sources: ["User1", "User2", "User3"],
    targets: [
      { id: "t1", label: "Enable Microsoft Defender for Servers on virtual machines:" },
      { id: "t2", label: "Review security recommendations and enable server vulnerability scans:" }
    ],
    answer: { t1: 0, t2: 0 },
    explanation: {
      correct: [
        "The reference answer is User1 for both tasks. User1 holds the Security administrator role, the security-specific role in Defender for Cloud that goes beyond reading: it can view recommendations and alerts, edit the security policy and enable or disable Defender plans, which is how Defender for Servers is turned on.",
        "The settings of the Defender for Servers plan are also where vulnerability assessment for machines is switched on for the subscription, so the same role covers reviewing recommendations and enabling the scans. It does so without the general right to create, change or delete resources that Contributor carries."
      ],
      wrong: [
        ["User2", "Security reader is read-only. It can review recommendations but cannot enable a plan or a scan."],
        ["User3", "Contributor is a general resource management role with write access to every resource in scope. The reference answer prefers the security-specific role."]
      ],
      concept: "In Defender for Cloud, Security reader views, Security administrator also changes security settings and Defender plans, and Contributor or Owner changes the resources themselves.",
      takeaway: "Turning a Defender plan on or off is within the Security administrator role.",
      refs: [["Microsoft Learn: User roles and permissions in Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/permissions"]]
    }
  },
  {
    id: "Q038", source: 38, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription.",
      "You need to create a hunting query that will return every email that contains an attachment named Document.pdf. The query must meet the following requirements:",
      { list: ["Only show emails sent during the last hour.", "Optimize query performance."] },
      "How should you complete the query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `EmailAttachmentInfo
{{f1}}
| where Subject == "Document Attachment" and FileName == "Document.pdf"
{{f2}}`,
    fields: [
      { id: "f1", label: "Line after the table name", options: [
        "| join DeviceFileEvents on SHA256",
        "| join kind=inner (DeviceFileEvents | where Timestamp > ago(1h)) on SHA256",
        "| where Timestamp > ago(1h)",
        "| where Timestamp < ago(1h)"
      ] },
      { id: "f2", label: "Last line of the query", options: [
        "| join DeviceFileEvents on SHA256",
        "| join kind=inner (DeviceFileEvents | where Timestamp > ago(1h)) on SHA256",
        "| where Timestamp > ago(1h)",
        "| where Timestamp < ago(1h)"
      ] }
    ],
    answer: { f1: 2, f2: 1 },
    explanation: {
      correct: [
        "Filtering on time first is the main performance rule for advanced hunting. `| where Timestamp > ago(1h)` directly after the table name restricts `EmailAttachmentInfo` to the last hour before any other work is done, and `>` keeps the rows that are newer than one hour ago.",
        "For the last line, the reference answer is the join whose right side is also limited to the last hour: `join kind=inner (DeviceFileEvents | where Timestamp > ago(1h)) on SHA256`. Reducing the right-hand table before the join keeps the join small, and `kind=inner` returns only rows that match on both sides."
      ],
      wrong: [
        ["| where Timestamp < ago(1h)", "`<` selects everything older than one hour, which is the opposite of the requirement."],
        ["| join DeviceFileEvents on SHA256", "This joins the whole device table with no time filter on it, so the query processes far more data than it needs."],
        ["The time filter as the last line", "A filter at the end means the earlier lines process all the retained data first."]
      ],
      concept: "Advanced hunting queries perform best when the time filter comes first and both sides of a join are reduced before they are joined.",
      takeaway: "Put `where Timestamp > ago(...)` right after the table, and filter the right side of a join inside its parentheses.",
      refs: [["Microsoft Learn: Advanced hunting query best practices", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-best-practices"]]
    }
  },
  {
    id: "Q039", source: 39, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Intermediate",
    stem: [
      "Your company has an on-premises network that uses Microsoft Defender for Identity.",
      "The Microsoft Secure Score for the company includes a security assessment associated with unsecure Kerberos delegation.",
      "You need remediate the security risk.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Disable legacy protocols on the computers listed as exposed entities." },
      { key: "B", text: "Enforce LDAP signing on the computers listed as exposed entities." },
      { key: "C", text: "Modify the properties of the computer objects listed as exposed entities." },
      { key: "D", text: "Install the Local Administrator Password Solution (LAPS) extension on the computers listed as exposed entities." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Unsecure Kerberos delegation is a setting stored on the account object in Active Directory. A computer that is trusted for delegation to any service, which is unconstrained delegation, can impersonate any user who authenticates to it. The remediation is to open each computer object listed as an exposed entity and change its delegation setting: remove the trust, or restrict it to specific services with constrained delegation."
      ],
      wrong: [
        ["A", "Legacy protocols are the subject of a different assessment. Disabling them does not change a delegation setting."],
        ["B", "LDAP signing protects LDAP traffic against tampering. It is also a separate assessment."],
        ["D", "LAPS manages the passwords of local administrator accounts. It has no effect on Kerberos delegation."]
      ],
      concept: "Each Defender for Identity security assessment lists exposed entities and a specific remediation, and for delegation the remediation is a change to the properties of the account.",
      takeaway: "Unsecure Kerberos delegation is fixed on the Delegation tab of the computer or user object.",
      refs: [["Microsoft Learn: Accounts security posture assessment", "https://learn.microsoft.com/en-us/defender-for-identity/security-posture-assessments/accounts"]]
    }
  },
  {
    id: "Q040", source: 40, type: "single",
    domain: "respond", topic: "Response actions", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft 365 Defender.",
      "A remediation action for an automated investigation quarantines a file across multiple devices.",
      "You need to mark the file as safe and remove the file from quarantine on the devices.",
      "What should you use in the Microsoft 365 Defender portal?"
    ],
    options: [
      { key: "A", text: "From the History tab in the Action center, revert the actions." },
      { key: "B", text: "From the investigation page, review the AIR processes." },
      { key: "C", text: "From Quarantine from the Review page, modify the rules." },
      { key: "D", text: "From Threat tracker, review the queries." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The Action center records every remediation action. Completed actions are on its History tab, and a completed action such as quarantining a file can be selected there and undone. Undoing a file quarantine restores the file, and it can be removed from quarantine on all the devices where the same action was taken."
      ],
      wrong: [
        ["B", "Reviewing the investigation shows what was found and what was done. It changes nothing."],
        ["C", "Quarantine under Review is for quarantined email messages in Defender for Office 365, not for files quarantined on devices."],
        ["D", "Threat trackers are saved views of email threats. They are not a way to undo remediation."]
      ],
      concept: "The Action center has a Pending tab for approving actions and a History tab where completed actions can be reviewed and undone.",
      takeaway: "Undo a completed remediation: Action center, History tab.",
      refs: [["Microsoft Learn: The Action center", "https://learn.microsoft.com/en-us/defender-xdr/m365d-action-center"],
        ["Microsoft Learn: View and manage actions in the Action center", "https://learn.microsoft.com/en-us/defender-xdr/m365d-autoir-actions"]]
    }
  },
  {
    id: "Q041", source: 41, type: "single",
    domain: "hunt", topic: "Threat analytics", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft 365 Defender.",
      "You need to review new attack techniques discovered by Microsoft and identify vulnerable resources in the subscription. The solution must minimize administrative effort.",
      "Which blade should you use in the Microsoft 365 Defender portal?"
    ],
    options: [
      { key: "A", text: "Advanced hunting" },
      { key: "B", text: "Threat analytics" },
      { key: "C", text: "Incidents & alerts" },
      { key: "D", text: "Learning hub" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Threat analytics is a set of reports written by Microsoft security researchers about new and active threats, attack techniques and vulnerabilities. Each report is combined with data from your own tenant: it shows related incidents and alerts, impacted assets, exposed devices and recommended mitigations. You get both the new techniques and your vulnerable resources without writing a query."
      ],
      wrong: [
        ["A", "With advanced hunting you would have to know what to look for and write the queries yourself, which is more effort, and it does not describe new techniques."],
        ["C", "Incidents & alerts shows what has already triggered in your tenant, not Microsoft's research or your exposure."],
        ["D", "The Learning hub offers training material."]
      ],
      concept: "Threat analytics joins Microsoft threat intelligence reports to the exposure and incident data of your tenant.",
      takeaway: "New threats from Microsoft together with your exposure: Threat analytics.",
      refs: [["Microsoft Learn: Threat analytics in Microsoft Defender", "https://learn.microsoft.com/en-us/defender-xdr/threat-analytics"]]
    }
  },
  {
    id: "Q042", source: 42, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Advanced",
    caseId: "case-fabrikam", caseOrder: 1,
    stem: [
      "You need to minimize the effort required to investigate the Microsoft Defender for Identity false positive alerts.",
      "What should you review?"
    ],
    options: [
      { key: "A", text: "the status update time" },
      { key: "B", text: "the resolution method of the source computer" },
      { key: "C", text: "the alert status" },
      { key: "D", text: "the certainty of the source computer" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Defender for Identity sees IP addresses in network traffic and resolves them to computer names with Network Name Resolution. When it cannot be sure which computer an address belongs to, an alert may name the wrong source computer, which is a common cause of false positives for alerts such as Suspected DCSync attack.",
        "Such an alert shows how sure the resolution was as the certainty of the source computer. Checking that value first tells you quickly whether the source is probably misidentified, without a full investigation."
      ],
      wrong: [
        ["A", "When the alert was last updated says nothing about whether it is a false positive."],
        ["B", "The resolution method tells you which technique produced the name. The value that states how reliable the result is, is the certainty."],
        ["C", "The alert status only shows where the alert is in the workflow."]
      ],
      concept: "Network Name Resolution maps IP addresses to computers, and alerts based on it carry a certainty that helps to judge them.",
      takeaway: "A suspected false positive in Defender for Identity: check the certainty of the source computer first.",
      refs: [
        ["Microsoft Learn: Network Name Resolution", "https://learn.microsoft.com/en-us/defender-for-identity/nnr-policy"],
        ["Microsoft Learn: View and manage Microsoft Defender for Identity security alerts", "https://learn.microsoft.com/en-us/defender-for-identity/understanding-security-alerts"]
      ]
    }
  },
  {
    id: "Q043", source: 43, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender 365.",
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with Azure AD.",
      "You need to identify the 100 most recent sign-in attempts recorded on devices and AD DS domain controllers.",
      "How should you complete the KQL query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `DeviceLogonEvents
| extend Table = 'table1'
| take 100
| {{f1}} (
    {{f2}}
    | extend Table = 'table2'
    | take 100
)
| project-reorder Timestamp, Table, AccountDomain, AccountName, AccountUpn, AccountSid
| order by Timestamp asc`,
    fields: [
      { id: "f1", label: "Selection before the opening parenthesis", options: ["IdentityInfo", "IdentityLogonEvents", "IdentityQueryEvents"] },
      { id: "f2", label: "Selection inside the parentheses", options: ["join kind = full outer", "join kind = inner", "union"] }
    ],
    answer: { f1: 1, f2: 2 },
    explanation: {
      correct: [
        "Sign-in attempts are recorded in two tables: `DeviceLogonEvents` for sign-ins on onboarded devices, and `IdentityLogonEvents` for authentication against Active Directory domain controllers, captured by Defender for Identity, and against Microsoft online services. The query needs both, so the table to add is `IdentityLogonEvents`.",
        "The two result sets have to be listed together, not matched to each other, and placing the rows of one table under the rows of another is `union`. Each side is labelled with `extend Table` and limited with `take 100` before the combined rows are ordered by time."
      ],
      wrong: [
        ["IdentityInfo", "This table holds account attributes such as department and job title, not sign-in events."],
        ["IdentityQueryEvents", "This table records queries against Active Directory objects, such as LDAP and DNS queries, not authentication."],
        ["join kind = inner or join kind = full outer", "A join matches rows on a key and needs an `on` clause. The query has none, and the goal is one combined list of events from both sources."]
      ],
      concept: "`union` combines the rows of tables, and `join` matches rows between tables on a key.",
      takeaway: "Sign-ins on devices and on domain controllers: `DeviceLogonEvents` and `IdentityLogonEvents` combined with `union`.",
      refs: [
        ["Microsoft Learn: IdentityLogonEvents table", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-identitylogonevents-table"],
        ["Microsoft Learn: union operator", "https://learn.microsoft.com/en-us/kusto/query/union-operator"]
      ]
    }
  },
  {
    id: "Q044", source: 44, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender 365.",
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with Azure AD.",
      "You need to identify LDAP requests by AD DS users to enumerate AD DS objects.",
      "How should you complete the KQL query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `{{f1}}
| where {{f2}} (AccountSid)`,
    fields: [
      { id: "f1", label: "Table to query", options: ["IdentityDirectoryEvents", "IdentityInfo", "IdentityQueryEvents"] },
      { id: "f2", label: "Function applied to AccountSid", options: ["contains", "has", "isnotempty"] }
    ],
    answer: { f1: 2, f2: 2 },
    explanation: {
      correct: [
        "`IdentityQueryEvents` contains the queries made against Active Directory objects, including LDAP, DNS and SAMR queries, so it is the table that shows LDAP requests used to enumerate objects.",
        "`isnotempty (AccountSid)` is a function call that keeps the rows in which the account SID is filled in, that is, queries that can be attributed to a user account. `contains` and `has` are string operators that are written between a column and a value. They cannot be used as a function around a column."
      ],
      wrong: [
        ["IdentityDirectoryEvents", "This table records events that involve a domain controller, such as password changes and changes to group membership, not the queries that users run."],
        ["IdentityInfo", "This table holds account attributes only."],
        ["contains or has", "Both need a column on the left and a search term on the right, for example `AccountSid has \"S-1-5\"`."]
      ],
      concept: "The identity tables of advanced hunting are split by purpose: `IdentityLogonEvents` for authentication, `IdentityQueryEvents` for directory queries, `IdentityDirectoryEvents` for directory changes and `IdentityInfo` for attributes.",
      takeaway: "LDAP enumeration is found in `IdentityQueryEvents`. `isnotempty()` is the function form of a filter on filled-in values.",
      refs: [["Microsoft Learn: IdentityQueryEvents table", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-identityqueryevents-table"]]
    }
  },
  {
    id: "Q045", source: 45, type: "single",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender 365.",
      "You need to ensure that you can investigate threats by using data in the unified audit log of Microsoft Defender for Cloud Apps.",
      "What should you configure first?"
    ],
    options: [
      { key: "A", text: "the User enrichment settings" },
      { key: "B", text: "the Azure connector" },
      { key: "C", text: "the Office 365 connector" },
      { key: "D", text: "the Automatic log upload settings" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Defender for Cloud Apps receives the activities of the Microsoft 365 workloads through its Office 365 app connector, and the connector takes them from the Microsoft 365 unified audit log. Until Office 365 is connected, none of that audit data appears in the activity log, so connecting the app is the first step."
      ],
      wrong: [
        ["A", "User enrichment adds Azure AD user names to Cloud Discovery data. It brings in no audit data."],
        ["B", "The Azure connector brings in activity from Azure subscriptions, not the Microsoft 365 audit log."],
        ["D", "Automatic log upload sends firewall and proxy logs for Cloud Discovery."]
      ],
      concept: "App connectors use the APIs of a cloud app to bring its activities and files into Defender for Cloud Apps.",
      takeaway: "Microsoft 365 audit activities in Defender for Cloud Apps start with the Office 365 connector.",
      refs: [["Microsoft Learn: Protect your Microsoft 365 environment", "https://learn.microsoft.com/en-us/defender-cloud-apps/protect-office-365"]]
    }
  },
  {
    id: "Q046", source: 46, type: "yesno",
    domain: "ops", topic: "Alert tuning and detections", difficulty: "Advanced",
    stem: [
      "You have a custom detection rule that includes the following KQL query.",
      { code: `AlertInfo
| where Severity == "High"
| distinct AlertId
| join AlertEvidence on AlertId
| where EntityType in ("User", "Mailbox")
| where EvidenceRole == "Impacted"
| summarize by Timestamp, AlertId, AccountName, AccountObjectId,
EntityType, DeviceId, SHA256
| join EmailEvents on $left.AccountObjectId == $right.RecipientObjectId
| where DeliveryAction == "Delivered"
| summarize by Timestamp, AlertId, ReportId, RecipientObjectId,
RecipientEmailAddtess, EntityType, DeviceId, SHA256` },
      "For each of the following statements, select Yes if True. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "The custom detection rule can be used to automate the deletion of email messages from a user's mailbox based on the `RecipientEmailAddress` column." },
      { text: "The custom detection rule can be used to restrict app execution automatically based on the `DeviceId` column." },
      { text: "The custom detection rule can be used to automate the deletion of a file based on the `SHA256` column." }
    ],
    answer: [false, true, true],
    explanation: {
      correct: [
        "A custom detection rule can take response actions automatically, but only on entities that the query returns in the columns which the action needs.",
        "Statement 1 is No. Actions on email messages need both `NetworkMessageId` and `RecipientEmailAddress` in the output of the query, so that the message and the mailbox can be identified. This query returns no `NetworkMessageId`.",
        "Statement 2 is Yes. Device actions, including restrict app execution, isolate device and run antivirus scan, are applied to the devices in the `DeviceId` column, which the query returns.",
        "Statement 3 is Yes. File actions work on a file hash column such as `SHA256` together with `DeviceId`. Quarantine file removes the file from its location on the device and keeps a copy in quarantine."
      ],
      wrong: [
        ["Statement 1 — Yes", "The address of the recipient alone does not identify a message. Without `NetworkMessageId` the rule has no email to act on."],
        ["Statement 2 — No", "`DeviceId` is exactly the column that device actions use."],
        ["Statement 3 — No", "The hash and the device are both returned, which is what the file actions need."]
      ],
      concept: "The actions of a custom detection rule are tied to columns: `DeviceId` for devices, a hash with `DeviceId` for files, an account column for users, and `NetworkMessageId` with `RecipientEmailAddress` for email.",
      takeaway: "Look at the final output of the query. An action is only possible when its identifying columns are there.",
      refs: [["Microsoft Learn: Create custom detection rules", "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules"]]
    }
  },
  {
    id: "Q047", source: 47, type: "single",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that uses Microsoft Defender for Servers Plan 1 and contains a server named Server1.",
      "You enable agentless scanning.",
      "You need to prevent Server1 from being scanned. The solution must minimize administrative effort.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Create an exclusion tag." },
      { key: "B", text: "Upgrade the subscription to Defender for Servers Plan 2." },
      { key: "C", text: "Create a governance rule." },
      { key: "D", text: "Create an exclusion group." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Agentless scanning for machines scans every supported machine in the subscription by taking snapshots of the disks. To leave a machine out, you define an exclusion tag in the agentless scanning settings and apply that tag to the machine. Defender for Cloud then skips any machine that carries the tag, so tagging Server1 is all that is needed."
      ],
      wrong: [
        ["B", "Changing the plan does not exclude a server from scanning, and it adds cost."],
        ["C", "A governance rule assigns owners and due dates to recommendations. It does not control what is scanned."],
        ["D", "Agentless scanning has no exclusion groups. Exclusions are made with tags."]
      ],
      concept: "Agentless scanning works at subscription level, and individual machines are excluded by resource tags.",
      takeaway: "Keep one machine out of agentless scanning with an exclusion tag.",
      refs: [["Microsoft Learn: Enable agentless machine scanning", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/enable-agentless-scanning-vms"]]
    }
  },
  {
    id: "Q048", source: 48, type: "multi",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Intermediate",
    stem: [
      "You need to configure Microsoft Defender for Cloud Apps to generate alerts and trigger remediation actions in response to external sharing of confidential files.",
      "Which two actions should you perform in the Microsoft 365 Defender portal? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "From Settings, select Information Protection, select Azure Information Protection, and then select Only scan files for Azure Information Protection classification labels and content inspection warnings from this tenant." },
      { key: "B", text: "From Cloud apps, select Files, and then filter File Type to Document." },
      { key: "C", text: "From Settings, select Information Protection, select Files, and then enable file monitoring." },
      { key: "D", text: "From Cloud apps, select Files, and then filter App to Office 365." },
      { key: "E", text: "From Cloud apps, select Files, and then select New policy from search." },
      { key: "F", text: "From Settings, select Information Protection, select Azure Information Protection, and then select Automatically scan new files for Azure Information Protection classification labels and content inspection warnings." }
    ],
    answer: ["E", "F"],
    explanation: {
      correct: [
        "The reference answer is E and F. Alerts and remediation actions for files come from a file policy. On the Files page under Cloud apps you search for the files you care about and select **New policy from search**, which creates a file policy from that filter. In the policy you set the alert and the governance actions for files that are shared externally (E).",
        "For the policy to recognize confidential files it needs their classification labels. Automatically scanning new files for Azure Information Protection classification labels makes the label available as a policy filter (F)."
      ],
      wrong: [
        ["A", "This limits label scanning to labels set in your own tenant. It is an optional narrowing and does not start the scanning of new files."],
        ["B", "Filtering by file type only changes what the Files page shows."],
        ["C", "File monitoring is the setting that lets Defender for Cloud Apps see files at all. In this version of the question the reference answer counts the policy and the label scanning."],
        ["D", "Filtering by app only changes what the Files page shows."]
      ],
      concept: "A file policy defines the alert and the governance actions, and label scanning supplies the classification that the policy filters on.",
      takeaway: "Alerts and actions on files come from a file policy, and label conditions need automatic label scanning.",
      refs: [
        ["Microsoft Learn: File policies in Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies"],
        ["Microsoft Learn: Integrate Microsoft Purview sensitivity labels with Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/azip-integration"]
      ]
    }
  }
);
