/* SC-200 question bank, part 1: questions 1 to 16 of the reference PDF. */
window.EXAM.questions.push(
  {
    id: "Q001", source: 1, type: "dragdrop",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You are investigating an incident by using Microsoft 365 Defender.",
      "You need to create an advanced hunting query to count failed sign-in authentications on three devices named CFOLaptop, CEOLaptop, and COOLaptop.",
      "How should you complete the query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Values",
    sources: [
      "| project LogonFailures=count()",
      "| summarize LogonFailures=count() by DeviceName, LogonType",
      "| where ActionType == FailureReason",
      '| where DeviceName in ("CFOLaptop", "CEOLaptop", "COOLaptop")',
      'ActionType == "LogonFailed"',
      "ActionType == FailureReason",
      "DeviceEvents",
      "DeviceLogonEvents"
    ],
    template: `{{t1}}
{{t2}} and
{{t3}}
{{t4}}`,
    targets: [
      { id: "t1", label: "First line of the query" },
      { id: "t2", label: "Second line, before and" },
      { id: "t3", label: "Third line, after and" },
      { id: "t4", label: "Last line of the query" }
    ],
    answer: { t1: 7, t2: 3, t3: 4, t4: 1 },
    explanation: {
      correct: [
        "`DeviceLogonEvents` is the advanced hunting table that records sign-ins and other authentication events on onboarded devices, so it is the table to count failed sign-ins from.",
        "The `where` line limits the rows to the three named devices with the `in` operator and, joined by `and`, to rows whose `ActionType` equals the literal value `\"LogonFailed\"`. `summarize LogonFailures=count() by DeviceName, LogonType` then turns the remaining rows into one count for each device and logon type."
      ],
      wrong: [
        ["DeviceEvents", "This table holds miscellaneous device events, such as events from security controls. Sign-in results are recorded in `DeviceLogonEvents`."],
        ["| project LogonFailures=count()", "`project` selects or renames columns. `count()` is an aggregation function and has to be used with `summarize`."],
        ["ActionType == FailureReason", "`FailureReason` is another column, which holds the reason text. Comparing the two columns does not select failed sign-ins; a failed sign-in is the `ActionType` value `LogonFailed`."]
      ],
      concept: "A counting query in advanced hunting has three parts: the right table, a filter with `where`, and an aggregation with `summarize ... by`.",
      takeaway: "Failed device sign-ins: `DeviceLogonEvents` where `ActionType == \"LogonFailed\"`, counted with `summarize count()`.",
      logic: "The word `and` after the second slot means the third slot is a bare condition without `| where`, which rules out the two values that start with a pipe.",
      refs: [
        ["Microsoft Learn: DeviceLogonEvents table", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-devicelogonevents-table"],
        ["Microsoft Learn: summarize operator", "https://learn.microsoft.com/en-us/kusto/query/summarize-operator"]
      ]
    }
  },
  {
    id: "Q002", source: 2, type: "single",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Basic",
    stem: [
      "You need to receive a security alert when a user attempts to sign in from a location that was never used by the other users in your organization to sign in.",
      "Which anomaly detection policy should you use?"
    ],
    options: [
      { key: "A", text: "Impossible travel" },
      { key: "B", text: "Activity from anonymous IP addresses" },
      { key: "C", text: "Activity from infrequent country" },
      { key: "D", text: "Malware detection" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "**Activity from infrequent country** works from past activity locations. The anomaly detection engine stores the locations that users in the organization have been active from, and it raises an alert when an activity comes from a location that was not recently visited, or was never visited, by any user in the organization. That is exactly a sign-in from a location none of the other users has used."
      ],
      wrong: [
        ["A", "Impossible travel compares two activities of the same user from distant places within a time too short to travel between them. It is about one user's speed, not about whether a location is new for the organization."],
        ["B", "This policy alerts on activity from IP addresses identified as anonymous proxies, such as Tor. The country plays no part."],
        ["D", "Malware detection scans files in cloud storage. It has nothing to do with sign-in locations."]
      ],
      concept: "Each Defender for Cloud Apps anomaly detection policy models a different signal: location history, travel speed, anonymizing IP addresses or file content.",
      takeaway: "Location new to the whole organization: Activity from infrequent country. Two far-apart sign-ins by one user: Impossible travel.",
      refs: [["Microsoft Learn: Anomaly detection policies in Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/anomaly-detection-policy"]]
    }
  },
  {
    id: "Q003", source: 3, type: "single",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Defender for Office 365.",
      "You have Microsoft SharePoint Online sites that contain sensitive documents. The documents contain customer account numbers that each consists of 32 alphanumeric characters.",
      "You need to create a data loss prevention (DLP) policy to protect the sensitive documents.",
      "What should you use to detect which documents are sensitive?"
    ],
    options: [
      { key: "A", text: "SharePoint search" },
      { key: "B", text: "a hunting query in Microsoft 365 Defender" },
      { key: "C", text: "Azure Information Protection" },
      { key: "D", text: "RegEx pattern matching" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "A DLP policy finds content through sensitive information types. No built-in type describes a company-specific account number, so you create a custom sensitive information type whose main element is a regular expression, here one that matches 32 alphanumeric characters. The DLP policy uses that type as its condition and so recognizes the documents in SharePoint Online that contain an account number."
      ],
      wrong: [
        ["A", "SharePoint search returns documents for a query that a person runs. It is not a detection method that a DLP policy can use as a condition."],
        ["B", "Advanced hunting queries security data about devices, email and identities. It does not classify the content of SharePoint documents for DLP."],
        ["C", "Azure Information Protection classifies and protects documents with labels. What tells a DLP policy that a document contains an account number is the pattern detection itself."]
      ],
      concept: "Custom sensitive information types use a regular expression, optionally with keywords and confidence levels, to detect data patterns that are specific to an organization.",
      takeaway: "A fixed-format identifier that no built-in type covers calls for a custom sensitive information type with a RegEx.",
      refs: [
        ["Microsoft Learn: Create custom sensitive information types", "https://learn.microsoft.com/en-us/purview/sit-create-a-custom-sensitive-information-type"],
        ["Microsoft Learn: Learn about data loss prevention", "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp"]
      ]
    }
  },
  {
    id: "Q004", source: 4, type: "multi",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    stem: [
      "Your company uses line-of-business apps that contain Microsoft Office VBA macros.",
      "You need to prevent users from downloading and running additional payloads from the Office VBA macros as additional child processes.",
      "Which two commands can you run to achieve the goal? Each correct answer presents a complete solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", code: `Add-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A
-AttackSurfaceReductionRules_Actions Enabled` },
      { key: "B", code: `Set-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A
-AttackSurfaceReductionRules_Actions AuditMode` },
      { key: "C", code: `Add-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A
-AttackSurfaceReductionRules_Actions AuditMode` },
      { key: "D", code: `Set-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A
-AttackSurfaceReductionRules_Actions Enabled` }
    ],
    answer: ["A", "D"],
    explanation: {
      correct: [
        "The GUID `D4F940AB-401B-4EFC-AADC-AD5F3C50688A` identifies the attack surface reduction rule **Block all Office applications from creating child processes**, which stops macros from starting further payloads as child processes. To block, the action of the rule must be `Enabled`. `AuditMode` only records what would have been blocked.",
        "Both cmdlets can set the rule. `Add-MpPreference` appends the rule to the rules that are already configured, and `Set-MpPreference` writes the rule list and replaces whatever was there. Each command with `Enabled` is therefore a complete solution by itself."
      ],
      wrong: [
        ["B", "`AuditMode` only logs an event when the rule would have fired. The child processes still start."],
        ["C", "This also sets the rule to audit, so nothing is blocked."]
      ],
      concept: "Attack surface reduction rules are identified by GUID, and each rule has its own state: disabled, block (`Enabled`), audit (`AuditMode`) or warn.",
      takeaway: "`Enabled` blocks and `AuditMode` only logs. `Add-MpPreference` appends to the rule list and `Set-MpPreference` overwrites it.",
      logic: "Remove the two AuditMode commands. The two that remain differ only in Add or Set, and both enforce the rule.",
      refs: [
        ["Microsoft Learn: Configure ASR rules and exclusions", "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-configure"],
        ["Microsoft Learn: Attack surface reduction rules reference", "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"]
      ]
    }
  },
  {
    id: "Q005", source: 5, type: "multi",
    domain: "ops", topic: "Alert tuning and detections", difficulty: "Intermediate",
    stem: [
      "Your company uses Microsoft Defender for Endpoint.",
      "The company has Microsoft Word documents that contain macros. The documents are used frequently on the devices of the company's accounting team.",
      "You need to hide false positive in the Alerts queue, while maintaining the existing security posture.",
      "Which three actions should you perform? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 3,
    options: [
      { key: "A", text: "Resolve the alert automatically." },
      { key: "B", text: "Hide the alert." },
      { key: "C", text: "Create a suppression rule scoped to any device." },
      { key: "D", text: "Create a suppression rule scoped to a device group." },
      { key: "E", text: "Generate the alert." }
    ],
    answer: ["B", "D", "E"],
    explanation: {
      correct: [
        "A suppression rule in Defender for Endpoint is created from an existing alert, so the alert has to be generated first (E). In the rule you choose what happens to matching alerts, and **Hide alert** keeps them out of the Alerts queue (B).",
        "Scoping the rule to a device group that contains the accounting team's devices (D) limits the suppression to the devices where the macro documents are expected. The same behavior on any other device still raises an alert, which is how the existing security posture is maintained."
      ],
      wrong: [
        ["A", "Resolving sets matching alerts to the Resolved status. The requirement is to hide the false positives from the queue."],
        ["C", "A rule scoped to any device would also hide the same alert on devices outside the accounting team, where macro activity is not expected. That weakens the security posture."]
      ],
      concept: "Suppression rules are created from an alert, apply the Hide or Resolve action, and can be scoped to a device, a device group or the whole organization.",
      takeaway: "Hide a known false positive with the narrowest scope that covers it: generate the alert, create the rule for a device group, choose Hide.",
      refs: [["Microsoft Learn: Manage Microsoft Defender for Endpoint suppression rules", "https://learn.microsoft.com/en-us/defender-endpoint/manage-suppression-rules"]]
    }
  },
  {
    id: "Q006", source: 6, type: "order",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Intermediate",
    stem: [
      "You open the Cloud App Security portal as shown in the following exhibit.",
      { image: "q06-cloud-discovery-discovered-apps.png", alt: "Cloud App Security portal, Cloud Discovery page, Discovered apps tab of a snapshot report for the last 90 days. The list shows 20 of 78 discovered apps, each with a risk score of 3: Applied Innovations (hosting services), StatusCake (website monitoring), Usersnap (productivity), CopperEgg (website monitoring) and Launchpad (code-hosting, 939 KB of traffic, 13 transactions, 13 users, 7 IP addresses). Each row has tag icons under Actions for marking the app as sanctioned or unsanctioned." },
      "Your environment does NOT have Microsoft Defender for Endpoint enabled.",
      "You need to remediate the risk for the Launchpad app.",
      "Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Tag the app as **Unsanctioned**.",
      "Run the script on the source appliance.",
      "Run the script in Azure Cloud Shell.",
      "Select the app.",
      "Tag the app as **Sanctioned**.",
      "Generate a block script."
    ],
    answer: [3, 0, 5, 1],
    explanation: {
      correct: [
        "Without Defender for Endpoint, Cloud App Security cannot block an unsanctioned app on the devices themselves. It exports a block script for the network appliance that sits between the users and the internet instead, and the script contains the apps that carry the **Unsanctioned** tag.",
        "The sequence is therefore: select the Launchpad app in the Discovered apps list, tag it as Unsanctioned, generate a block script for your type of appliance, and run the script on the source appliance, the firewall or proxy whose logs feed Cloud Discovery. From then on the appliance blocks traffic to the app."
      ],
      wrong: [
        ["Tag the app as Sanctioned", "Sanctioned marks an app as approved. A sanctioned app is not included in a block script."],
        ["Run the script in Azure Cloud Shell", "The script is written in the format of the appliance and changes nothing in Azure. It has to run on the appliance that handles the traffic."],
        ["Generate a block script before tagging", "The script only contains apps that are already tagged as Unsanctioned, so the tag comes first."]
      ],
      concept: "Discovered apps are governed by tagging them, and the block is enforced either through Defender for Endpoint or by exporting a block script to a network appliance.",
      takeaway: "No Defender for Endpoint: unsanction the app, generate a block script, run it on the firewall or proxy.",
      refs: [["Microsoft Learn: Govern discovered apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/governance-discovery"]]
    }
  },
  {
    id: "Q007", source: 7, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription.",
      "You plan to perform cross-domain investigations by using Microsoft 365 Defender.",
      "You need to create an advanced hunting query to identify devices affected by a malicious email attachment.",
      "How should you complete the query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `EmailAttachmentInfo
| where SenderFromAddress =~ "MaliciousSender@example.com"
| where isnotempty (SHA256)
| {{f1}} (
DeviceFileEvents
| {{f2}} FileName, SHA256
) on SHA256
| {{f3}} Timestamp, FileName, SHA256, DeviceName, DeviceId,
NetworkMessageId, SenderFromAddress, RecipientEmailAddress`,
    fields: [
      { id: "f1", label: "Operator before the opening parenthesis", options: ["extend", "join", "project", "union"] },
      { id: "f2", label: "Operator before FileName, SHA256", options: ["extend", "join", "project", "union"] },
      { id: "f3", label: "Operator before the final column list", options: ["extend", "join", "project", "union"] }
    ],
    answer: { f1: 1, f2: 2, f3: 2 },
    explanation: {
      correct: [
        "The query starts from `EmailAttachmentInfo`, keeps the attachments from the malicious sender that have a SHA256 hash, and then has to find the same files on devices. Matching two tables on a shared column is what `join` does, and the closing `) on SHA256` confirms that the block in parentheses is the right side of a join.",
        "Inside the join, `project FileName, SHA256` reduces `DeviceFileEvents` to the two columns that are needed, which keeps the join small. The last line lists the columns to return, and choosing output columns is again `project`."
      ],
      wrong: [
        ["extend", "`extend` adds a calculated column and needs an assignment such as `extend x = ...`. It does not match tables and does not accept a bare list of existing columns."],
        ["union", "`union` places the rows of tables under each other and has no `on` clause, so it cannot match attachments to device files by hash."],
        ["join in the second or third drop-down", "A join needs a table expression after it. Those two positions are followed by a plain list of columns."]
      ],
      concept: "Cross-domain hunting joins an email table to a device table on the SHA256 file hash and projects only the columns that are needed.",
      takeaway: "`( ... ) on <column>` after a blank means `join`. A bare list of columns after a blank means `project`.",
      refs: [
        ["Microsoft Learn: Hunt for threats across devices, emails, apps, and identities", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-emails-devices"],
        ["Microsoft Learn: join operator", "https://learn.microsoft.com/en-us/kusto/query/join-operator"]
      ]
    }
  },
  {
    id: "Q008", source: 8, type: "multi",
    domain: "ops", topic: "Alert tuning and detections", difficulty: "Intermediate",
    stem: [
      "You have the following advanced hunting query in Microsoft 365 Defender.",
      { code: `DeviceProcessEvents
| where Timestamp > ago (24h)
and InitiatingProcessFileName =~ 'runsll32.exe'
and InitiatingProcessCommandLine !contains " " and InitiatingProcessCommandLine != ""
and FileName in~ ('schtasks.exe')
and ProcessCommandLine has 'Change' and ProcessCommandLine has 'SystemRestore'
and ProcessCommandLine has 'disable'
| project Timestamp, AccountName, ProcessCommandLine` },
      "You need to receive an alert when any process disables System Restore on a device managed by Microsoft Defender during the last 24 hours.",
      "Which two actions should you perform? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "Create a detection rule." },
      { key: "B", text: "Create a suppression rule." },
      { key: "C", text: "Add `| order by Timestamp` to the query." },
      { key: "D", text: "Replace `DeviceProcessEvents` with `DeviceNetworkEvents`." },
      { key: "E", text: "Add `DeviceId` and `ReportId` to the output of the query." }
    ],
    answer: ["A", "E"],
    explanation: {
      correct: [
        "An advanced hunting query only returns results when someone runs it. To be alerted, you save the query as a custom detection rule. The rule runs the query on a schedule and creates an alert for the results (A).",
        "A custom detection rule can only be created from a query that returns the columns which identify the event and the affected entity. For a device table such as `DeviceProcessEvents` these are `Timestamp`, `DeviceId` and `ReportId`. The query projects `Timestamp` but not the other two, so `DeviceId` and `ReportId` have to be added to its output (E)."
      ],
      wrong: [
        ["B", "A suppression rule hides or resolves alerts. It does not create them."],
        ["C", "Sorting changes the order of the results. It does not raise an alert and adds none of the required columns."],
        ["D", "`DeviceNetworkEvents` records network connections. The activity to detect is a process, `schtasks.exe`, being started, which is recorded in `DeviceProcessEvents`."]
      ],
      concept: "A custom detection rule turns a hunting query into a scheduled detection. The query must return `Timestamp`, `ReportId` and an entity column such as `DeviceId`.",
      takeaway: "An alert from a hunting query means a detection rule, and the query must return `Timestamp`, `DeviceId` and `ReportId`.",
      refs: [["Microsoft Learn: Create custom detection rules", "https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules"]]
    }
  },
  {
    id: "Q009", source: 9, type: "multi",
    domain: "ops", topic: "Roles and device groups", difficulty: "Intermediate",
    stem: [
      "You are investigating a potential attack that deploys a new ransomware strain.",
      "You have three custom device groups. The groups contain devices that store highly sensitive information.",
      "You plan to perform automated actions on all devices.",
      "You need to be able to temporarily group the machines to perform actions on the devices.",
      "Which three actions should you perform? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 3,
    options: [
      { key: "A", text: "Assign a tag to the device group." },
      { key: "B", text: "Add the device users to the admin role." },
      { key: "C", text: "Add a tag to the machines." },
      { key: "D", text: "Create a new device group that has a rank of 1." },
      { key: "E", text: "Create a new admin role." },
      { key: "F", text: "Create a new device group that has a rank of 4." }
    ],
    answer: ["A", "C", "D"],
    explanation: {
      correct: [
        "Device groups in Defender for Endpoint are filled by matching rules, and a tag is the simplest property to match for a temporary grouping. You create a new device group whose membership rule matches a tag (A), and you add that tag to the machines that should be in it (C).",
        "A device can belong to only one device group. When a device matches several groups, it is placed in the group with the highest rank, and rank 1 is the highest. The devices already match three custom groups, so the new group needs rank 1 to take them over (D). When the investigation is finished, removing the tag or the group returns the devices to their original groups."
      ],
      wrong: [
        ["B", "Adding users to an admin role changes who can do what in the portal. It does not group machines."],
        ["E", "A new admin role also only controls permissions, not which group a device is in."],
        ["F", "Rank 4 is below the three existing groups, so the devices would stay in the groups they are in now."]
      ],
      concept: "Device groups are rule-based, a device is in exactly one group, and the matching group with the highest rank wins.",
      takeaway: "Temporary grouping: tag the machines, create a group that matches the tag, give it rank 1.",
      refs: [
        ["Microsoft Learn: Create and manage device groups", "https://learn.microsoft.com/en-us/defender-endpoint/machine-groups"],
        ["Microsoft Learn: Create and manage device tags", "https://learn.microsoft.com/en-us/defender-endpoint/machine-tags"]
      ]
    }
  },
  {
    id: "Q010", source: 10, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Basic",
    caseId: "set-mdi-accounts", caseOrder: 1,
    stem: [
      "Solution: From Entity tags, you add the accounts as Honeytoken accounts.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Accounts that are set up for attackers to exploit are decoys. Defender for Identity calls them honeytoken accounts: accounts that no legitimate user or service should ever use. You designate them under Entity tags by adding the accounts with the Honeytoken tag, and any authentication or other activity that involves them then raises an alert."
      ],
      wrong: [
        ["B", "The Honeytoken entity tag is the Defender for Identity setting for bait accounts, so the solution does what the goal asks."]
      ],
      concept: "Defender for Identity entity tags: Honeytoken marks decoy accounts, Sensitive marks high-value accounts and groups.",
      takeaway: "Accounts for attackers to exploit are honeytoken accounts, set under Entity tags.",
      refs: [["Microsoft Learn: Defender for Identity entity tags", "https://learn.microsoft.com/en-us/defender-for-identity/entity-tags"]]
    }
  },
  {
    id: "Q011", source: 11, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Basic",
    caseId: "set-mdi-accounts", caseOrder: 2,
    stem: [
      "Solution: From Azure AD Identity Protection, you configure the sign-in risk policy.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "A sign-in risk policy in Azure AD Identity Protection reacts to risky cloud sign-ins, for example by requiring multi-factor authentication. It is configured outside the Defender for Identity portal and does not designate any account as a decoy. The goal is met by tagging the accounts as Honeytoken accounts under Entity tags in Defender for Identity."
      ],
      wrong: [
        ["A", "The policy changes how risky sign-ins are handled. It creates no accounts for attackers to exploit and is not a Defender for Identity setting."]
      ],
      concept: "Identity Protection policies respond to risk on real accounts. Honeytoken tags in Defender for Identity create bait accounts.",
      takeaway: "A risk policy is a response control, not a decoy.",
      refs: [["Microsoft Learn: Defender for Identity entity tags", "https://learn.microsoft.com/en-us/defender-for-identity/entity-tags"]]
    }
  },
  {
    id: "Q012", source: 12, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Basic",
    caseId: "set-mdi-accounts", caseOrder: 3,
    stem: [
      "Solution: You add the accounts to an Active Directory group and add the group as a Sensitive group.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The Sensitive tag marks high-value accounts and groups that are in real use, so that detections which depend on sensitivity, such as changes to sensitive groups and lateral movement paths, take them into account. It does not turn accounts into bait. Decoy accounts are tagged as Honeytoken, which raises an alert on any use of the account."
      ],
      wrong: [
        ["A", "A Sensitive group is treated as an asset to protect. Its members are not treated as accounts that should never be used."]
      ],
      concept: "Sensitive is for assets worth protecting, Honeytoken is for decoys that should never be touched.",
      takeaway: "Sensitive group and honeytoken account are different tags with different purposes.",
      refs: [["Microsoft Learn: Defender for Identity entity tags", "https://learn.microsoft.com/en-us/defender-for-identity/entity-tags"]]
    }
  },
  {
    id: "Q013", source: 13, type: "single",
    domain: "respond", topic: "Defender for Office 365", difficulty: "Basic",
    stem: [
      "You implement Safe Attachments policies in Microsoft Defender for Office 365.",
      "Users report that email messages containing attachments take longer than expected to be received.",
      "You need to reduce the amount of time it takes to deliver messages that contain attachments without compromising security. The attachments must be scanned for malware, and any messages that contain malware must be blocked.",
      "What should you configure in the Safe Attachments policies?"
    ],
    options: [
      { key: "A", text: "Dynamic Delivery" },
      { key: "B", text: "Replace" },
      { key: "C", text: "Block and Enable redirect" },
      { key: "D", text: "Monitor and Enable redirect" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "**Dynamic Delivery** delivers the body of the message immediately and puts a placeholder in place of each attachment while Safe Attachments scans it. When the scan finishes, clean attachments are attached again and malicious ones are blocked. Users no longer wait for the scan, yet every attachment is still scanned and malware is still stopped."
      ],
      wrong: [
        ["B", "Replace removes attachments that are found to be malicious, but the message is only delivered after scanning, so the delay remains."],
        ["C", "Block holds the message until the scan is complete, which is the delay users complain about. Redirect only sends detected messages to another mailbox for review."],
        ["D", "Monitor delivers messages even when malware is found and only tracks the result, so malware is not blocked."]
      ],
      concept: "The Safe Attachments actions differ in whether delivery waits for the scan and whether malware is blocked. Only Dynamic Delivery removes the wait and still blocks.",
      takeaway: "Complaints about slow delivery, and malware must still be blocked: Dynamic Delivery.",
      refs: [["Microsoft Learn: Safe Attachments in Microsoft Defender for Office 365", "https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-about"]]
    }
  },
  {
    id: "Q014", source: 14, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Advanced",
    stem: [
      "You are informed of an increase in malicious email being received by users.",
      "You need to create an advanced hunting query in Microsoft 365 Defender to identify whether the accounts of the email recipients were compromised. The query must return the most recent 20 sign-ins performed by the recipients within an hour of receiving the known malicious email.",
      "How should you complete the query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `let MaliciousEmails = {{f1}}
| where MalwareFilterVerdict == "Malware"
| project TimeEmail = Timestamp, Subject, SenderFromAddress, AccountName =
tostring(split (RecipientEmailAddress, "@") [0]);
MaliciousEmails
| join ( {{f2}}
| project LogonTime = Timestamp, AccountName, DeviceName
) on AccountName
| where (LogonTime - TimeEmail) between (0min.. 60min)
| {{f3}}`,
    fields: [
      { id: "f1", label: "Table in the let statement", options: ["EmailAttachementInfo", "EmailEvents", "IdentityLogonEvents"] },
      { id: "f2", label: "Table inside the join", options: ["EmailAttachementInfo", "EmailEvents", "IdentityLogonEvents"] },
      { id: "f3", label: "Last line of the query", options: ["select 20", "take 20", "top 20"] }
    ],
    answer: { f1: 1, f2: 2, f3: 1 },
    explanation: {
      correct: [
        "`MalwareFilterVerdict`, `Subject`, `SenderFromAddress` and `RecipientEmailAddress` are columns of `EmailEvents`, the table with one row for each email message, so the `let` statement reads from `EmailEvents`. The joined block projects `Timestamp`, `AccountName` and `DeviceName` as sign-in data, which comes from `IdentityLogonEvents`, the table of authentication activity.",
        "The reference answer for the last line is `take 20`. `take` returns up to the stated number of rows and needs nothing else. `top 20` is incomplete without a `by` expression, and `select` is not a KQL operator."
      ],
      wrong: [
        ["EmailAttachementInfo", "The attachment table has one row for each attachment and is used to follow files by hash. The filter here is on the verdict of the message, and the projected columns are message columns."],
        ["IdentityLogonEvents in the let statement", "Sign-in rows have no malware verdict and no subject."],
        ["top 20", "`top` has to be written as `top 20 by <column>`. Without `by` the line does not parse."],
        ["select 20", "`select` belongs to SQL, not to KQL."]
      ],
      concept: "Email is linked to identity by taking the recipients of malicious mail from `EmailEvents` and their sign-ins from `IdentityLogonEvents`, joined on the account name within a time window.",
      takeaway: "Choose the table by the columns that the following lines use. `take n` stands alone, `top n` needs `by`.",
      refs: [
        ["Microsoft Learn: Hunt for threats across devices, emails, apps, and identities", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-emails-devices"],
        ["Microsoft Learn: take operator", "https://learn.microsoft.com/en-us/kusto/query/take-operator"]
      ]
    }
  },
  {
    id: "Q015", source: 15, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Basic",
    stem: [
      "You receive a security bulletin about a potential attack that uses an image file.",
      "You need to create an indicator of compromise (IoC) in Microsoft Defender for Endpoint to prevent the attack.",
      "Which indicator type should you use?"
    ],
    options: [
      { key: "A", text: "a URL/domain indicator that has Action set to Alert only" },
      { key: "B", text: "a URL/domain indicator that has Action set to Alert and block" },
      { key: "C", text: "a file hash indicator that has Action set to Alert and block" },
      { key: "D", text: "a certificate indicator that has Action set to Alert and block" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The threat is a specific file, an image. A file is identified by its hash, so you create a file hash indicator. To prevent the attack and not only report it, the action has to block: **Alert and block** stops the file from being read, written or run on devices and raises an alert."
      ],
      wrong: [
        ["A", "A URL/domain indicator targets a network destination, not a file, and Alert only would not prevent anything."],
        ["B", "This blocks a website or domain. The bulletin describes a file, which can arrive through any channel."],
        ["D", "A certificate indicator applies to files that are signed with a given certificate. An image file is not identified that way."]
      ],
      concept: "Defender for Endpoint indicators exist for file hashes, IP addresses, URLs and domains, and certificates, each with an allow, audit, alert or block action.",
      takeaway: "A known bad file is blocked with a file hash indicator set to block.",
      refs: [["Microsoft Learn: Create indicators for files", "https://learn.microsoft.com/en-us/defender-endpoint/indicator-file"]]
    }
  },
  {
    id: "Q016", source: 16, type: "multi",
    domain: "ops", topic: "Roles and device groups", difficulty: "Intermediate",
    stem: [
      "Your company deploys the following services:",
      { list: ["Microsoft Defender for Identity", "Microsoft Defender for Endpoint", "Microsoft Defender for Office 365"] },
      "You need to provide a security analyst with the ability to use the Microsoft 365 security center. The analyst must be able to approve and reject pending actions generated by Microsoft Defender for Endpoint. The solution must use the principle of least privilege.",
      "Which two roles should assign to the analyst? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "the Compliance Data Administrator in Azure Active Directory (Azure AD)" },
      { key: "B", text: "the Active remediation actions role in Microsoft Defender for Endpoint" },
      { key: "C", text: "the Security Administrator role in Azure Active Directory (Azure AD)" },
      { key: "D", text: "the Security Reader role in Azure Active Directory (Azure AD)" }
    ],
    answer: ["B", "D"],
    explanation: {
      correct: [
        "Security Reader gives read-only access to the Microsoft 365 security center, which is enough to sign in and view incidents, alerts and the Action center. Approving or rejecting pending remediation actions is a Defender for Endpoint permission: a Defender for Endpoint role that includes **Active remediation actions** lets the analyst act on them.",
        "Together the two roles cover both requirements without the right to change security settings across the tenant."
      ],
      wrong: [
        ["A", "Compliance Data Administrator manages compliance data and features. It is not the role for approving remediation actions on endpoints."],
        ["C", "Security Administrator could do both tasks, but it can also manage security policies and settings across Microsoft 365, which is more than the analyst needs."]
      ],
      concept: "Access to the security portal comes from an Azure AD role, and what an analyst may do in Defender for Endpoint comes from the permissions of a Defender for Endpoint role.",
      takeaway: "Least privilege for approving actions: Security Reader for portal access and a Defender for Endpoint role with Active remediation actions.",
      refs: [["Microsoft Learn: Create and manage roles for role-based access control", "https://learn.microsoft.com/en-us/defender-endpoint/user-roles"]]
    }
  }
);
