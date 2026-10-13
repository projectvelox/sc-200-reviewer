/* SC-200 question bank, part 2: questions 17 to 32 of the reference PDF. */
window.EXAM.questions.push(
  {
    id: "Q017", source: 17, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender and an Azure subscription that uses Azure Sentinel.",
      "You need to identify all the devices that contain files in emails sent by a known malicious email sender. The query will be based on the match of the SHA256 hash.",
      "How should you complete the query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `EmailAttachmentInfo
| where SenderFromAddress =~ "MaliciousSender@example.com"
where isnotempty {{f1}}
| join (
DeviceFileEvents
| project FileName, SHA256
) on {{f2}}
| project Timestamp, FileName, SHA256, DeviceName, DeviceId,
NetworkMessageId, SenderFromAddress, RecipientEmailAddress`,
    fields: [
      { id: "f1", label: "Argument of isnotempty", options: ["(DeviceId)", "(RecipientEmailAddress)", "(SenderFromAddress)", "(SHA256)"] },
      { id: "f2", label: "Column after on", options: ["DeviceId", "RecipientEmailAddress", "SenderFromAddress", "SHA256"] }
    ],
    answer: { f1: 3, f2: 3 },
    explanation: {
      correct: [
        "The requirement states that the match is based on the SHA256 hash. Before the join, the query keeps only the attachment rows that actually have a hash, `isnotempty (SHA256)`, because a row without a hash can never match a file on a device.",
        "The join then matches `EmailAttachmentInfo` to `DeviceFileEvents` `on SHA256`. The hash is the one value that identifies the same file in both tables, and it is the only column besides `FileName` that the right side of the join projects."
      ],
      wrong: [
        ["DeviceId", "At that point `DeviceId` exists only in the device table, and the right side of the join projects just `FileName` and `SHA256`, so there is no `DeviceId` to join on."],
        ["RecipientEmailAddress or SenderFromAddress", "These are email columns. Device file events have no sender or recipient, so they cannot link the two tables, and the sender is already filtered on the line above."]
      ],
      concept: "A file is followed from email to endpoint by joining `EmailAttachmentInfo` and `DeviceFileEvents` on the SHA256 hash.",
      takeaway: "The join key must exist on both sides. For files across email and devices, that key is `SHA256`.",
      refs: [["Microsoft Learn: Hunt for threats across devices, emails, apps, and identities", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-emails-devices"]]
    }
  },
  {
    id: "Q018", source: 18, type: "multi",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Intermediate",
    stem: [
      "You need to configure Microsoft Cloud App Security to generate alerts and trigger remediation actions in response to external sharing of confidential files.",
      "Which two actions should you perform in the Cloud App Security portal? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "From Settings, select Information Protection, select Azure Information Protection, and then select Only scan files for Azure Information Protection classification labels and content inspection warnings from this tenant." },
      { key: "B", text: "Select Investigate files, and then filter App to Office 365." },
      { key: "C", text: "Select Investigate files, and then select New policy from search." },
      { key: "D", text: "From Settings, select Information Protection, select Azure Information Protection, and then select Automatically scan new files for Azure Information Protection classification labels and content inspection warnings." },
      { key: "E", text: "From Settings, select Information Protection, select Files, and then enable file monitoring." },
      { key: "F", text: "Select Investigate files, and then filter File Type to Document." }
    ],
    answer: ["D", "E"],
    explanation: {
      correct: [
        "The reference answer is D and E. Both are settings that have to be on before Cloud App Security can act on confidential files. File monitoring (Settings, Information Protection, Files) makes Cloud App Security scan the files in connected apps, so that file policies have data to evaluate (E).",
        "Automatically scanning new files for Azure Information Protection classification labels (D) makes the label of each file, such as Confidential, available as a policy condition. With both in place, a file policy can match confidential files that are shared externally, raise an alert and apply a governance action."
      ],
      wrong: [
        ["A", "This limits label scanning to labels from your own tenant and ignores labels set by other tenants. It narrows the scan and does not turn on scanning of new files."],
        ["B", "Filtering the Files page by app only changes what the list shows."],
        ["C", "A policy created from a file search needs file monitoring and label scanning to be enabled before it can match confidential files. The reference answer selects those two settings."],
        ["F", "Filtering by file type only changes the view. It enables nothing."]
      ],
      concept: "File policies depend on file monitoring and, for label conditions, on the scanning of information protection labels.",
      takeaway: "Before a file policy can react to labelled files, enable file monitoring and automatic label scanning.",
      refs: [
        ["Microsoft Learn: File policies in Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/data-protection-policies"],
        ["Microsoft Learn: Integrate Microsoft Purview sensitivity labels with Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/azip-integration"]
      ]
    }
  },
  {
    id: "Q019", source: 19, type: "dropdown",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Intermediate",
    stem: [
      "You purchase a Microsoft 365 subscription.",
      "You plan to configure Microsoft Cloud App Security.",
      "You need to create a custom template-based policy that detects connections to Microsoft 365 apps that originate from a botnet network.",
      "What should you use? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Policy template type:", options: ["Access policy", "Activity policy", "Anomaly detection policy"] },
      { id: "f2", label: "Filter based on:", options: ["IP address tag", "Source", "User agent string"] }
    ],
    answer: { f1: 1, f2: 0 },
    explanation: {
      correct: [
        "A connection to a Microsoft 365 app is an activity, and custom policies that alert on activities with given properties are activity policies. Cloud App Security includes activity policy templates, such as the one for logons from a risky IP address, which you use as the starting point of the custom policy.",
        "Cloud App Security tags the IP addresses it knows about. Tor, anonymous proxy and Botnet are built-in IP address tags, so filtering the activity on the IP address tag Botnet selects the connections that originate from a botnet network."
      ],
      wrong: [
        ["Access policy", "Access policies belong to Conditional Access App Control and allow or block access in real time for sessions that go through the proxy. They are not the template-based detection that is asked for."],
        ["Anomaly detection policy", "Anomaly detection policies are built-in detections that you tune. They are not custom policies built from a template with your own filters."],
        ["Source", "Source describes where the activity was recorded from, such as the app connector, not the network it came from."],
        ["User agent string", "The user agent identifies the client software, such as the browser, not the network of origin."]
      ],
      concept: "Activity policies match activities by filters, and the IP address tag filter exposes the built-in categories such as Botnet, Tor and anonymous proxy.",
      takeaway: "Custom alert on activity from a known bad network: activity policy with an IP address tag filter.",
      refs: [
        ["Microsoft Learn: Create activity policies", "https://learn.microsoft.com/en-us/defender-cloud-apps/user-activity-policies"],
        ["Microsoft Learn: Work with IP ranges and tags", "https://learn.microsoft.com/en-us/defender-cloud-apps/ip-tags"]
      ]
    }
  },
  {
    id: "Q020", source: 20, type: "single",
    domain: "respond", topic: "Microsoft Entra ID", difficulty: "Basic",
    stem: [
      "Your company has a single office in Istanbul and a Microsoft 365 subscription.",
      "The company plans to use conditional access policies to enforce multi-factor authentication (MFA).",
      "You need to enforce MFA for all users who work remotely.",
      "What should you include in the solution?"
    ],
    options: [
      { key: "A", text: "a fraud alert" },
      { key: "B", text: "a user risk policy" },
      { key: "C", text: "a named location" },
      { key: "D", text: "a sign-in user policy" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Conditional Access decides by conditions, and the location condition is how it tells a sign-in from the office from a remote one. You define the public IP address range of the Istanbul office as a named location and then create a policy that requires MFA for all users from all locations except that named location. Anyone who signs in from outside the office is then asked for MFA."
      ],
      wrong: [
        ["A", "A fraud alert lets users report an MFA prompt that they did not start. It does not decide who is prompted."],
        ["B", "A user risk policy acts on the likelihood that an account is compromised, not on where the user works."],
        ["D", "A policy that acts on sign-in risk evaluates how suspicious a sign-in looks, not whether it comes from outside the office."]
      ],
      concept: "Named locations define trusted IP ranges or countries that Conditional Access policies can include or exclude.",
      takeaway: "MFA for everyone outside the office: define the office as a named location and exclude it from the MFA policy.",
      refs: [["Microsoft Learn: Conditional Access policy: Using network signals", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"]]
    }
  },
  {
    id: "Q021", source: 21, type: "multi",
    domain: "respond", topic: "Defender for Cloud Apps", difficulty: "Intermediate",
    stem: [
      "You are configuring Microsoft Cloud App Security.",
      "You have a custom threat detection policy based on the IP address ranges of your company's United States-based offices.",
      "You receive many alerts related to impossible travel and sign-ins from risky IP addresses.",
      "You determine that 99% of the alerts are legitimate sign-ins from your corporate offices.",
      "You need to prevent alerts for legitimate sign-ins from known locations.",
      "Which two actions should you perform? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", text: "Configure automatic data enrichment." },
      { key: "B", text: "Add the IP addresses to the corporate address range category." },
      { key: "C", text: "Increase the sensitivity level of the impossible travel anomaly detection policy." },
      { key: "D", text: "Add the IP addresses to the other address range category and add a tag." },
      { key: "E", text: "Create an activity policy that has an exclusion for the IP addresses." }
    ],
    answer: ["A", "B"],
    explanation: {
      correct: [
        "The reference answer is A and B. In Cloud App Security, IP address ranges are part of the data enrichment settings: a range that you define gets a category and optional tags, and activities from that range are enriched with them.",
        "Ranges in the **Corporate** category are treated as known locations of your organization, which the detections use to avoid alerting on sign-ins from your own offices. Adding the office addresses to the Corporate category removes the alerts for legitimate sign-ins while the policies keep working for every other address."
      ],
      wrong: [
        ["C", "A higher sensitivity level produces more alerts, not fewer."],
        ["D", "The Other category with a tag only labels the addresses. It does not mark them as the organization's own network."],
        ["E", "An activity policy is a separate custom detection. An exclusion in it does not change what the built-in impossible travel and risky IP address detections alert on."]
      ],
      concept: "IP address ranges with the Corporate category tell Cloud App Security which locations belong to the organization.",
      takeaway: "False positives from your own offices: add the office IP ranges with the Corporate category.",
      refs: [["Microsoft Learn: Work with IP ranges and tags", "https://learn.microsoft.com/en-us/defender-cloud-apps/ip-tags"]]
    }
  },
  {
    id: "Q022", source: 22, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Basic",
    caseId: "set-mdi-accounts", caseOrder: 4,
    stem: [
      "Solution: You add each account as a Sensitive account.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Tagging an account as Sensitive tells Defender for Identity that it is a high-value asset in real use, so that detections which depend on sensitivity take it into account. It does not make the account a decoy. Accounts that exist for attackers to exploit are tagged as Honeytoken accounts under Entity tags, which raises an alert whenever one of them is used."
      ],
      wrong: [
        ["A", "A Sensitive account is one to protect. It is still expected to be used, so its use alone raises no alert."]
      ],
      concept: "Sensitive is for assets worth protecting, Honeytoken is for decoys that should never be touched.",
      takeaway: "Bait accounts get the Honeytoken tag, not the Sensitive tag.",
      refs: [["Microsoft Learn: Defender for Identity entity tags", "https://learn.microsoft.com/en-us/defender-for-identity/entity-tags"]]
    }
  },
  {
    id: "Q023", source: 23, type: "single",
    domain: "respond", topic: "Defender for Office 365", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant that uses Microsoft Exchange Online and Microsoft Defender for Office 365.",
      "What should you use to identify whether zero-hour auto purge (ZAP) moved an email message from the mailbox of a user?"
    ],
    options: [
      { key: "A", text: "the Threat Protection Status report in Microsoft Defender for Office 365" },
      { key: "B", text: "the mailbox audit log in Exchange" },
      { key: "C", text: "the Safe Attachments file types report in Microsoft Defender for Office 365" },
      { key: "D", text: "the mail flow report in Exchange" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Zero-hour auto purge acts on a message after delivery, when a new verdict arrives. To find out whether ZAP moved a message, Microsoft's guidance on ZAP points to the threat reporting of Defender for Office 365: the Threat protection status report, and Threat Explorer or real-time detections for the details of individual messages. Of the options listed, only the Threat protection status report is one of those tools."
      ],
      wrong: [
        ["B", "The mailbox audit log records actions by mailbox owners, delegates and administrators. It is not the report of ZAP activity."],
        ["C", "This report shows which types of attachment were detected. It does not show what happened to a message after delivery."],
        ["D", "Mail flow reports show the volume and direction of mail, not remediation after delivery."]
      ],
      concept: "ZAP removes or moves delivered messages after a later verdict, and its actions are reported in the Defender for Office 365 threat reports.",
      takeaway: "Did ZAP act on a message? Check the Threat protection status report or Threat Explorer.",
      refs: [
        ["Microsoft Learn: Zero-hour auto purge (ZAP)", "https://learn.microsoft.com/en-us/defender-office-365/zero-hour-auto-purge"],
        ["Microsoft Learn: View email security reports", "https://learn.microsoft.com/en-us/defender-office-365/reports-email-security"]
      ]
    }
  },
  {
    id: "Q024", source: 24, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that contains 1,000 Windows 10 devices. The devices have Microsoft Office 365 installed.",
      "You need to mitigate the following device threats:",
      { list: [
        "Microsoft Excel macros that download scripts from untrusted websites",
        "Users that open executable attachments in Microsoft Outlook",
        "Outlook rules and forms exploits"
      ] },
      "What should you use?"
    ],
    options: [
      { key: "A", text: "Microsoft Defender Antivirus" },
      { key: "B", text: "attack surface reduction rules in Microsoft Defender for Endpoint" },
      { key: "C", text: "Windows Defender Firewall" },
      { key: "D", text: "adaptive application control in Azure Defender" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Each of the three threats is a behavior, not a known malicious file, and attack surface reduction rules exist to block risky behavior of Office and email clients. There are rules that stop Office applications from creating child processes or executable content, a rule that blocks executable content from email clients and webmail, and rules that restrict what Outlook and other Office communication apps may start."
      ],
      wrong: [
        ["A", "Defender Antivirus detects and removes malware that it recognizes. It does not restrict what legitimate Office applications are allowed to do."],
        ["C", "The firewall filters network connections by port, program and address. It has no understanding of macros, attachments or Outlook rules."],
        ["D", "Adaptive application control builds allowlists of applications for machines that Azure Defender protects. It does not control Office behavior on Windows 10 clients."]
      ],
      concept: "Attack surface reduction rules block specific behaviors that malware commonly abuses in Office, scripts and email.",
      takeaway: "Risky Office or Outlook behavior, as opposed to a known bad file, points to attack surface reduction rules.",
      refs: [
        ["Microsoft Learn: Attack surface reduction rules overview", "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-overview"],
        ["Microsoft Learn: Attack surface reduction rules reference", "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"]
      ]
    }
  },
  {
    id: "Q025", source: 25, type: "single",
    domain: "ops", topic: "SIEM integration", difficulty: "Basic",
    stem: [
      "You have a third-party security information and event management (SIEM) solution.",
      "You need to ensure that the SIEM solution can generate alerts for Azure Active Directory (Azure AD) sign-events in near real time.",
      "What should you do to route events to the SIEM solution?"
    ],
    options: [
      { key: "A", text: "Create an Azure Sentinel workspace that has a Security Events connector." },
      { key: "B", text: "Configure the Diagnostics settings in Azure AD to stream to an event hub." },
      { key: "C", text: "Create an Azure Sentinel workspace that has an Azure Active Directory connector." },
      { key: "D", text: "Configure the Diagnostics settings in Azure AD to archive to a storage account." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The diagnostic settings of Azure AD can send sign-in and audit logs to several destinations. Streaming to an Azure event hub is the one meant for external tools: the logs arrive within minutes, and third-party SIEM products read them from the event hub with their own connector."
      ],
      wrong: [
        ["A", "The Security Events connector collects Windows security event logs from machines into Azure Sentinel. It handles neither Azure AD sign-ins nor the third-party SIEM."],
        ["C", "This sends the sign-in logs to Azure Sentinel, which is a different SIEM from the one you have."],
        ["D", "Archiving to a storage account is for long-term retention. It is not a near real-time feed that a SIEM consumes."]
      ],
      concept: "Azure AD logs reach external systems through diagnostic settings, and an event hub is the streaming destination for third-party SIEM integration.",
      takeaway: "Third-party SIEM and near real time: stream to an event hub.",
      refs: [["Microsoft Learn: Stream Microsoft Entra logs to an event hub", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-stream-logs-to-event-hub"]]
    }
  },
  {
    id: "Q026", source: 26, type: "dragdrop",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription linked to an Azure Active Directory (Azure AD) tenant. The tenant contains two users named User1 and User2.",
      "You plan to deploy Azure Defender.",
      "You need to enable User1 and User2 to perform tasks at the subscription level as shown in the following table.",
      { table: {
        head: ["User", "Task"],
        rows: [
          ["User1", "• Assign initiatives\n• Edit security policies\n• Enable automatic provisioning"],
          ["User2", "• View alerts and recommendations\n• Apply security recommendations\n• Dismiss alerts"]
        ]
      } },
      "The solution must use the principle of least privilege.",
      "Which role should you assign to each user? To answer, drag the appropriate roles to the correct users. Each role may be used once, more than once, or not at all.",
      "You may need to drag the split bar between panes or scroll to view content."
    ],
    sourceLabel: "Roles",
    sources: ["Contributor", "Owner", "Security administrator", "Security reader"],
    targets: [
      { id: "t1", label: "User1:" },
      { id: "t2", label: "User2:" }
    ],
    answer: { t1: 1, t2: 0 },
    explanation: {
      correct: [
        "The reference answer is Owner for User1 and Contributor for User2. The tasks of User1 change how the subscription is governed: assigning initiatives creates Azure Policy assignments on the subscription, and User1 must also edit security policies and turn on automatic provisioning. The Owner role on the subscription includes all of these.",
        "User2 has to apply security recommendations, which means changing the resources themselves, in addition to viewing alerts and recommendations and dismissing alerts. Changing resources requires Contributor. The security roles do not allow it."
      ],
      wrong: [
        ["Security reader", "This role is read-only. It can view alerts and recommendations but cannot dismiss alerts, apply recommendations or change policy."],
        ["Security administrator for User2", "Security administrator can view and dismiss alerts and edit the security policy, but it cannot apply recommendations because it has no write access to the resources."],
        ["Owner for User2", "Owner would work but adds the right to manage role assignments, which the tasks of User2 do not need."]
      ],
      concept: "In Azure Defender, the security roles view and manage security settings, while applying a recommendation needs write access to the resource through Contributor or Owner.",
      takeaway: "Applying recommendations needs Contributor. Read-only work needs Security reader.",
      refs: [["Microsoft Learn: User roles and permissions in Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/permissions"]]
    }
  },
  {
    id: "Q027", source: 27, type: "dropdown",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains 200 Windows 10 devices enrolled in Microsoft Defender for Endpoint.",
      "You need to ensure that users can access the devices by using a remote shell connection directly from the Microsoft 365 Defender portal. The solution must use the principle of least privilege.",
      "What should you do in the Microsoft 365 Defender portal? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "To configure Microsoft Defender for Endpoint:", options: [
        "Turn on endpoint detection and response (EDR) in block mode",
        "Turn on Live Response",
        "Turn off Tamper Protection"
      ] },
      { id: "f2", label: "To configure the devices:", options: [
        "Add a network assessment job",
        "Create a device group that contains the devices and set Automation level to Full",
        "Create a device group that contains the devices and set Automation level to No automated response"
      ] }
    ],
    answer: { f1: 1, f2: 1 },
    explanation: {
      correct: [
        "A remote shell connection from the portal to a device is the live response feature. It is off by default and is switched on in the advanced features of Defender for Endpoint, so the first setting is **Turn on Live Response**.",
        "Live response also has a prerequisite on the device side: the device must be in a device group that has an automation remediation level assigned. A session cannot be started on a device whose group is set to No automated response. The reference answer therefore creates a device group that contains the devices and sets its automation level to Full."
      ],
      wrong: [
        ["Turn on endpoint detection and response (EDR) in block mode", "EDR in block mode lets Defender for Endpoint remediate detections when another antivirus product is the primary one. It does not open a remote shell."],
        ["Turn off Tamper Protection", "Tamper protection guards security settings against changes. Turning it off weakens the devices and has nothing to do with live response."],
        ["Add a network assessment job", "A network assessment job scans network devices for vulnerabilities."],
        ["Automation level set to No automated response", "Without an automation level, a live response session cannot be established for the devices in the group."]
      ],
      concept: "Live response needs the advanced feature to be enabled and the device to be in a device group with an automation remediation level.",
      takeaway: "Remote shell means live response: enable it in advanced features and give the device group an automation level.",
      refs: [["Microsoft Learn: Investigate entities on devices using live response", "https://learn.microsoft.com/en-us/defender-endpoint/live-response"]]
    }
  },
  {
    id: "Q028", source: 28, type: "dropdown",
    domain: "hunt", topic: "KQL and advanced hunting", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft 365 Defender and contains a user named User1.",
      "You are notified that the account of User1 is compromised.",
      "You need to review the alerts triggered on the devices to which User1 signed in.",
      "How should you complete the query? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `DeviceInfo
| where LoggedOnUsers contains 'user1'
| distinct DeviceId
| {{f1}} kind=inner AlertEvidence on DeviceId
| project AlertId
| join AlertInfo on AlertId
| {{f2}} AlertId, Timestamp, Title, Severity, Category`,
    fields: [
      { id: "f1", label: "Operator before kind=inner", options: ["extend", "join", "project"] },
      { id: "f2", label: "Operator before the final column list", options: ["project", "summarize", "take"] }
    ],
    answer: { f1: 1, f2: 0 },
    explanation: {
      correct: [
        "The first three lines produce the list of devices that User1 has signed in to. `kind=inner AlertEvidence on DeviceId` is the syntax of a `join`: it matches those devices to rows in `AlertEvidence`, the table that links alerts to the entities involved. The alert IDs are then joined to `AlertInfo` to get the details of each alert.",
        "The last line names the columns to show for each alert, and returning a chosen set of columns is `project`."
      ],
      wrong: [
        ["extend", "`extend` adds calculated columns. It has no `kind=` argument and no `on` clause."],
        ["project in the first drop-down", "`project` takes a list of columns, not another table and a join key."],
        ["summarize", "`summarize` aggregates rows and needs an aggregation function or a `by` clause. A bare list of five columns is a projection."],
        ["take", "`take` expects a number of rows, not column names."]
      ],
      concept: "Alerts are linked to entities through `AlertEvidence`, and alert details come from `AlertInfo`, joined on `AlertId`.",
      takeaway: "`kind=` and `on` belong to `join`. A plain list of columns at the end of a query is `project`.",
      refs: [
        ["Microsoft Learn: Hunt for threats across devices, emails, apps, and identities", "https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-query-emails-devices"],
        ["Microsoft Learn: join operator", "https://learn.microsoft.com/en-us/kusto/query/join-operator"]
      ]
    }
  },
  {
    id: "Q029", source: 29, type: "single",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft SharePoint Online.",
      "You delete users from the subscription.",
      "You need to be notified if the deleted users downloaded numerous documents from SharePoint Online sites during the month before their accounts were deleted.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "a file policy in Microsoft Defender for Cloud Apps" },
      { key: "B", text: "an access review policy" },
      { key: "C", text: "an alert policy in Microsoft Defender for Office 365" },
      { key: "D", text: "an insider risk policy" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Insider risk management has a policy template for data theft by departing users. Its triggering event is the user leaving, taken from an HR connector or from the deletion of the user account in Azure AD. When the trigger occurs, the policy evaluates the activity of the user in the period before it, such as downloading large numbers of files from SharePoint Online, and raises an alert when the activity is unusual."
      ],
      wrong: [
        ["A", "A file policy evaluates files and how they are shared. It has no link to an account being deleted or to what the user did in the month before."],
        ["B", "An access review asks reviewers to confirm who should keep a group membership or access to an app. It does not look at download activity."],
        ["C", "An alert policy raises an alert when a defined activity occurs from then on. It does not start from the deletion of an account and look back over the month before it."]
      ],
      concept: "Insider risk policies combine a triggering event, such as a user leaving, with activity indicators in a window around that event.",
      takeaway: "Mass downloads before a user leaves: insider risk management, Data theft by departing users.",
      refs: [["Microsoft Learn: Learn about Insider Risk Management policy templates", "https://learn.microsoft.com/en-us/purview/insider-risk-management-policy-templates"]]
    }
  },
  {
    id: "Q030", source: 30, type: "single",
    domain: "respond", topic: "Microsoft Purview", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that has Microsoft 365 Defender enabled.",
      "You need to identify all the changes made to sensitivity labels during the past seven days.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Incidents blade of the Microsoft 365 Defender portal" },
      { key: "B", text: "the Alerts settings on the Data Loss Prevention blade of the Microsoft 365 compliance center" },
      { key: "C", text: "Activity explorer in the Microsoft 365 compliance center" },
      { key: "D", text: "the Explorer settings on the Email & collaboration blade of the Microsoft 365 Defender portal" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Activity explorer shows the history of activities on labelled content. Its events include a sensitivity label being applied, changed or removed, with who did it and when, and the view can be filtered by activity type and by date range, for example the past seven days."
      ],
      wrong: [
        ["A", "Incidents group security alerts. They are not a log of labeling activity."],
        ["B", "The DLP alert settings control how DLP alerts are generated. They do not list label changes."],
        ["D", "Explorer under Email & collaboration is Threat Explorer, which investigates email threats."]
      ],
      concept: "Activity explorer is the data classification view of what users did with labelled and sensitive content.",
      takeaway: "Who changed which label and when: Activity explorer.",
      refs: [["Microsoft Learn: Get started with activity explorer", "https://learn.microsoft.com/en-us/purview/data-classification-activity-explorer"]]
    }
  },
  {
    id: "Q031", source: 31, type: "single",
    domain: "respond", topic: "Incident investigation", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft 365 Defender.",
      "You need to identify all the entities affected by an incident.",
      "Which tab should you use in the Microsoft 365 Defender portal?"
    ],
    options: [
      { key: "A", text: "Investigations" },
      { key: "B", text: "Devices" },
      { key: "C", text: "Evidence and Response" },
      { key: "D", text: "Alerts" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The Evidence and Response tab of an incident lists all the entities found in the alerts of the incident, such as files, processes, IP addresses, URLs, email messages, users and devices, together with their verdict and remediation status. It is the one place that shows every entity the incident touched."
      ],
      wrong: [
        ["A", "Investigations lists the automated investigations that the alerts of the incident triggered."],
        ["B", "Devices lists only the devices related to the incident, which is one type of entity."],
        ["D", "Alerts lists the alerts in the incident. Entities appear inside each alert, not as one list."]
      ],
      concept: "An incident page has tabs for the attack story, alerts, assets, investigations and the evidence, with its entities, that was collected.",
      takeaway: "All entities of an incident in one list: Evidence and Response.",
      refs: [["Microsoft Learn: Investigate incidents in the Microsoft Defender portal", "https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents"]]
    }
  },
  {
    id: "Q032", source: 32, type: "single",
    domain: "respond", topic: "Defender for Identity", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that is linked to a hybrid Azure AD tenant.",
      "You need to identify all the changes made to Domain Admins group during the past 30 days.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Modifications of sensitive groups report in Microsoft Defender for Identity" },
      { key: "B", text: "the identity security posture assessment in Microsoft Defender for Cloud Apps" },
      { key: "C", text: "the Azure Active Directory Provisioning Analysis workbook" },
      { key: "D", text: "the Overview settings of Insider risk management" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Defender for Identity monitors the domain controllers and treats Domain Admins as a sensitive group by default. Its report on modifications to sensitive groups lists every change made to sensitive groups in on-premises Active Directory for a period that you choose, so a 30-day report shows who was added to or removed from Domain Admins and by whom."
      ],
      wrong: [
        ["B", "Identity security posture assessments point out configurations to fix. They are not a change log of group membership."],
        ["C", "This workbook analyzes the provisioning of accounts between Azure AD and applications, not changes to on-premises groups."],
        ["D", "The Insider risk management overview summarizes insider risk alerts and cases."]
      ],
      concept: "Defender for Identity reports cover changes to sensitive groups, passwords exposed in cleartext and lateral movement paths to sensitive accounts.",
      takeaway: "Changes to Domain Admins over a period: the Defender for Identity report on modifications to sensitive groups.",
      refs: [["Microsoft Learn: Working with Microsoft Defender for Identity reports (classic portal)", "https://learn.microsoft.com/en-us/previous-versions/defender-for-identity/classic-reports"]]
    }
  }
);
