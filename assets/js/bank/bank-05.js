/* SC-200 question bank, part 5: questions 65 to 80 of the reference PDF. */
window.EXAM.questions.push(
  {
    id: "Q065", source: 65, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Defender XDR.",
      "You need to implement deception rules. The solution must ensure that you can limit the scope of the rules.",
      "What should you create first?"
    ],
    options: [
      { key: "A", text: "device groups" },
      { key: "B", text: "device tags" },
      { key: "C", text: "honeytoken entity tags" },
      { key: "D", text: "sensitive entity tags" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "A deception rule plants decoys and lures on devices. When you create the rule you choose its scope: all Windows client devices, or only the devices that carry specific device tags. To be able to limit a rule to selected devices, the tags have to exist on those devices before the rule is created."
      ],
      wrong: [
        ["A", "Device groups control permissions and automation levels in Defender for Endpoint. The scope of a deception rule is chosen by device tag."],
        ["C", "Honeytoken entity tags mark accounts as decoys in Defender for Identity. They do not scope deception rules on devices."],
        ["D", "Sensitive entity tags mark high-value identities in Defender for Identity."]
      ],
      concept: "Deception rules in Defender XDR are scoped to all Windows client devices or to devices with chosen tags.",
      takeaway: "Limit a deception rule with device tags, so tag the devices first.",
      refs: [["Microsoft Learn: Create and manage device tags", "https://learn.microsoft.com/en-us/defender-endpoint/machine-tags"],
        ["Microsoft Learn: Microsoft Defender XDR documentation", "https://learn.microsoft.com/en-us/defender-xdr/"]]
    }
  },
  {
    id: "Q066", source: 66, type: "single",
    domain: "ops", topic: "Endpoint configuration", difficulty: "Intermediate",
    caseId: "set-passive-av", caseOrder: 4,
    stem: [
      "All Windows devices are onboarded to Microsoft Defender for Endpoint.",
      "Solution: You enable Live Response.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Live response gives an analyst a remote shell on a device, to investigate and to run remediation commands by hand. It protects nothing by itself: an artifact that the third-party antivirus product missed stays on the device until someone finds it and acts. Automatic blocking and remediation of such artifacts while Microsoft Defender Antivirus is in passive mode comes from EDR in block mode."
      ],
      wrong: [
        ["A", "Live response is a manual investigation tool. Enabling it does not detect or block anything."]
      ],
      concept: "Live response is an interactive response tool, and protection against missed artifacts in passive mode comes from EDR in block mode.",
      takeaway: "A tool that waits for an analyst is not protection. EDR in block mode is.",
      refs: [
        ["Microsoft Learn: Investigate entities on devices using live response", "https://learn.microsoft.com/en-us/defender-endpoint/live-response"],
        ["Microsoft Learn: Endpoint detection and response in block mode", "https://learn.microsoft.com/en-us/defender-endpoint/edr-in-block-mode"]
      ]
    }
  },
  {
    id: "Q067", source: 67, type: "single",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Intermediate",
    caseId: "set-asc-alert", caseOrder: 1,
    stem: [
      "Solution: From Security alerts, you select the alert, select Take Action, and then expand the Prevent future attacks section.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The sections on the Take action tab of a security alert have different purposes. **Mitigate the threat** contains the remediation steps for the alert itself, which is what resolving the alert needs. **Prevent future attacks** lists security recommendations that reduce the attack surface, so that similar attacks are less likely later. Expanding Prevent future attacks therefore does not show how to resolve the current alert."
      ],
      wrong: [
        ["A", "Prevent future attacks is about hardening against later attacks. The goal is to resolve the alert that was received."]
      ],
      concept: "The Take action tab of an alert separates mitigating the current threat from preventing future attacks, automated responses and suppression.",
      takeaway: "Resolve this alert: Mitigate the threat. Harden for later: Prevent future attacks.",
      refs: [["Microsoft Learn: Manage and respond to security alerts", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/manage-respond-alerts"]]
    }
  },
  {
    id: "Q068", source: 68, type: "single",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Intermediate",
    stem: [
      "You receive an alert from Azure Defender for Key Vault.",
      "You discover that the alert is generated from multiple suspicious IP addresses.",
      "You need to reduce the potential of Key Vault secrets being leaked while you investigate the issue. The solution must be implemented as soon as possible and must minimize the impact on legitimate users.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Modify the access control settings for the key vault." },
      { key: "B", text: "Enable the Key Vault firewall." },
      { key: "C", text: "Create an application security group." },
      { key: "D", text: "Modify the access policy for the key vault." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The suspicious requests come from IP addresses, so the fastest way to cut them off is at the network level. Enabling the Key Vault firewall denies access from all networks except the virtual networks and IP ranges that you allow. Legitimate users and applications on the allowed networks keep working with their existing permissions, while requests from the suspicious addresses are rejected."
      ],
      wrong: [
        ["A", "Access control decides which identities may manage the vault. It does not stop requests from particular IP addresses, and changing it can lock out legitimate users."],
        ["C", "An application security group groups the network interfaces of virtual machines for network security group rules. It does not restrict access to a key vault."],
        ["D", "The access policy grants identities permissions on keys, secrets and certificates. Changing it affects legitimate users and does not filter by source address."]
      ],
      concept: "The Key Vault firewall restricts the networks that can reach the vault, independently of identity permissions.",
      takeaway: "A threat from suspicious IP addresses is contained with the Key Vault firewall, not by changing permissions.",
      refs: [
        ["Microsoft Learn: Configure network security for Azure Key Vault", "https://learn.microsoft.com/en-us/azure/key-vault/general/network-security"],
        ["Microsoft Learn: Overview of Microsoft Defender for Key Vault", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-key-vault-introduction"]
      ]
    }
  },
  {
    id: "Q069", source: 69, type: "dropdown",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that has Azure Defender enabled for all supported resource types.",
      "You create an Azure logic app named LA1.",
      "You plan to use LA1 to automatically remediate security risks detected in Azure Security Center.",
      "You need to test LA1 in Security Center.",
      "What should you do? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Set the LA1 trigger to:", options: [
        "When an Azure Security Center Recommendation is created or triggered",
        "When an Azure Security Center Alert is created or triggered",
        "When a response to an Azure Security Center alert is triggered"
      ] },
      { id: "f2", label: "Trigger the execution of LA1 from:", options: ["Recommendations", "Workflow automation", "Security alerts"] }
    ],
    answer: { f1: 0, f2: 2 },
    explanation: {
      correct: [
        "The reference answer is **When an Azure Security Center Recommendation is created or triggered** for the trigger and **Security alerts** for where to start the run.",
        "A logic app that Security Center can run must start with one of the triggers of the Security Center connector. The recommendation trigger passes the details of a security recommendation to the logic app, which suits a logic app that remediates the security risks that Security Center reports. To test a logic app you run it manually from an item in Security Center, without waiting for an automation to run. The Workflow automation page is where you later define the conditions under which the logic app runs by itself."
      ],
      wrong: [
        ["When an Azure Security Center Alert is created or triggered", "This trigger passes the details of a security alert. The reference answer uses the recommendation trigger."],
        ["When a response to an Azure Security Center alert is triggered", "This is another alert trigger of the connector. It is not the trigger in the reference answer."],
        ["Workflow automation", "Workflow automation defines automatic runs for future alerts or recommendations. It is not where you start a single test run."]
      ],
      concept: "Security Center runs logic apps through its connector triggers, either manually from an item or automatically through workflow automation.",
      takeaway: "The trigger of the logic app decides what data it receives. Workflow automation decides when it runs automatically.",
      refs: [["Microsoft Learn: Workflow automation in Microsoft Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/workflow-automations"]]
    }
  },
  {
    id: "Q070", source: 70, type: "single",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 subscription that uses Azure Defender.",
      "You have 100 virtual machines in a resource group named RG1.",
      "You assign the Security Admin roles to a new user named SecAdmin1.",
      "You need to ensure that SecAdmin1 can apply quick fixes to the virtual machines by using Azure Defender. The solution must use the principle of least privilege.",
      "Which role should you assign to SecAdmin1?"
    ],
    options: [
      { key: "A", text: "the Security Reader role for the subscription" },
      { key: "B", text: "the Contributor for the subscription" },
      { key: "C", text: "the Contributor role for RG1" },
      { key: "D", text: "the Owner role for RG1" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "A quick fix applies a recommendation by changing the configuration of the affected resource. Security Admin can view recommendations and edit the security policy but has no write access to the resources, so SecAdmin1 also needs a role that can modify the virtual machines. Contributor grants that. Assigning it at the scope of RG1, where the 100 virtual machines are, gives the access where it is needed and nowhere else."
      ],
      wrong: [
        ["A", "Security Reader is read-only and adds nothing to what Security Admin already has."],
        ["B", "Contributor on the subscription would work, but it covers every resource in the subscription, which is broader than needed."],
        ["D", "Owner adds the right to manage role assignments on RG1, which applying fixes does not require."]
      ],
      concept: "Applying a recommendation needs write access to the resource, and least privilege means the smallest role at the smallest scope.",
      takeaway: "Quick fix needs Contributor at the scope that holds the resources.",
      refs: [["Microsoft Learn: User roles and permissions in Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/permissions"]]
    }
  },
  {
    id: "Q071", source: 71, type: "multi",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Basic",
    stem: [
      "You provision a Linux virtual machine in a new Azure subscription.",
      "You enable Azure Defender and onboard the virtual machine to Azure Defender.",
      "You need to verify that an attack on the virtual machine triggers an alert in Azure Defender.",
      "Which two Bash commands should you run on the virtual machine? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    select: 2,
    options: [
      { key: "A", code: `cp /bin/echo ./asc_alerttest_662jfi039n` },
      { key: "B", code: `./alerttest testing eicar pipe` },
      { key: "C", code: `cp /bin/echo ./alerttest` },
      { key: "D", code: `./asc_alerttest_662jfi039n testing eicar pipe` }
    ],
    answer: ["A", "D"],
    explanation: {
      correct: [
        "Azure Defender has a built-in way to validate alerts on a Linux machine without real malware. You copy a harmless executable to a file with the reserved name `asc_alerttest_662jfi039n` (A) and then run that file with the arguments `testing eicar pipe` (D). The agent recognizes the file name and the arguments, and a test alert appears in Azure Defender a few minutes later."
      ],
      wrong: [
        ["B", "This runs a file named `alerttest`. That is not the reserved test name, so no alert is raised."],
        ["C", "This creates the copy under a name that Azure Defender does not recognize."]
      ],
      concept: "Alert validation uses a reserved file name and arguments that the agent treats as a harmless test of the alert pipeline.",
      takeaway: "Linux alert test: copy `/bin/echo` to `asc_alerttest_662jfi039n`, then run it with `testing eicar pipe`.",
      refs: [["Microsoft Learn: Validate alerts in Microsoft Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/alert-validation"]]
    }
  },
  {
    id: "Q072", source: 72, type: "single",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Basic",
    stem: [
      "You create an Azure subscription named sub1.",
      "In sub1, you create a Log Analytics workspace named workspace1.",
      "You enable Azure Security Center and configure Security Center to use workspace1.",
      "You need to collect security event logs from the Azure virtual machines that report to workspace1.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "From Security Center, enable data collection" },
      { key: "B", text: "In sub1, register a provider." },
      { key: "C", text: "From Security Center, create a Workflow automation." },
      { key: "D", text: "In workspace1, create a workbook." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Security Center collects data from virtual machines through an agent. Turning on data collection installs the agent on the Azure virtual machines and connects it to the configured workspace, and the data collection settings also let you choose which Windows security events are stored there. Once it is enabled, the security event logs of the machines are sent to workspace1."
      ],
      wrong: [
        ["B", "Registering a resource provider makes a service available in the subscription. It installs no agent and collects no logs."],
        ["C", "A workflow automation runs a logic app in response to alerts or recommendations. It does not collect events."],
        ["D", "A workbook visualizes data that is already in the workspace."]
      ],
      concept: "Data collection in Security Center provisions the agent on machines and chooses the level of security events to store.",
      takeaway: "No data from virtual machines without data collection turned on.",
      refs: [["Microsoft Learn: Overview of the extensions that collect data from your workloads", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/monitoring-components"]]
    }
  },
  {
    id: "Q073", source: 73, type: "order",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Intermediate",
    stem: [
      "You create a new Azure subscription and start collecting logs for Azure Monitor.",
      "You need to configure Azure Security Center to detect possible threats related to sign-ins from suspicious IP addresses to Azure virtual machines. The solution must validate the configuration.",
      "Which three actions should you perform in a sequence? To answer, move the appropriate actions from the list of action to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Change the alert severity threshold for emails to **Medium**.",
      "Copy an executable file on a virtual machine and rename the file as ASC_AlertTest_662jfi039N.exe.",
      "Enable Azure Defender for the subscription.",
      "Change the alert severity threshold for emails to **Low**.",
      "Run the executable file and specify the appropriate arguments.",
      "Rename the executable file as AlertTest.exe."
    ],
    answer: [2, 1, 4],
    explanation: {
      correct: [
        "Threat detection for virtual machines, including alerts about sign-ins from suspicious IP addresses, is part of Azure Defender, which is off in a new subscription. Enabling Azure Defender for the subscription comes first.",
        "To validate that alerts are produced, Security Center provides a test: copy any executable file on a virtual machine and rename it `ASC_AlertTest_662jfi039N.exe`, then run it with the documented arguments. Security Center recognizes the file name and raises a test alert, which confirms that detection and alerting work."
      ],
      wrong: [
        ["Change the alert severity threshold for emails to Medium or Low", "The threshold only decides which alerts are sent by email. It neither enables detection nor tests it."],
        ["Rename the executable file as AlertTest.exe", "Only the reserved name `ASC_AlertTest_662jfi039N.exe` is recognized as the test."],
        ["Running the file before enabling Azure Defender", "Without Azure Defender the machine is not monitored for threats, so no alert would be raised."]
      ],
      concept: "Threat detection requires Azure Defender, and alert validation uses a reserved executable name with specific arguments.",
      takeaway: "Enable the plan, create the reserved test file, run it: the test alert proves that the pipeline works.",
      refs: [["Microsoft Learn: Validate alerts in Microsoft Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/alert-validation"]]
    }
  },
  {
    id: "Q074", source: 74, type: "single",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Basic",
    stem: [
      "Your company uses Azure Security Center and Azure Defender.",
      "The security operations team at the company informs you that it does NOT receive email notifications for security alerts.",
      "What should you configure in Security Center to enable the email notifications?"
    ],
    options: [
      { key: "A", text: "Security solutions" },
      { key: "B", text: "Security policy" },
      { key: "C", text: "Pricing & settings" },
      { key: "D", text: "Security alerts" },
      { key: "E", text: "Azure Defender" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "In Security Center, email notifications are a setting of each subscription. You open **Pricing & settings**, select the subscription and go to Email notifications, where you enter the recipients, by role or by email address, and the alert severity from which emails are sent. If nothing is configured there, the security operations team receives no alert emails."
      ],
      wrong: [
        ["A", "Security solutions lists integrated partner solutions and data sources."],
        ["B", "Security policy defines which recommendations are evaluated."],
        ["D", "Security alerts shows the alerts. It has no notification settings."],
        ["E", "The Azure Defender dashboard shows coverage and the status of the plans."]
      ],
      concept: "Email notifications for alerts are configured for each subscription in the settings of Security Center.",
      takeaway: "No alert emails: check Email notifications in the settings of the subscription.",
      refs: [["Microsoft Learn: Configure email notifications for alerts and attack paths", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/configure-email-notifications"]]
    }
  },
  {
    id: "Q075", source: 75, type: "order",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Advanced",
    stem: [
      "You have resources in Azure and Google cloud.",
      "You need to ingest Google Cloud Platform (GCP) data into Azure Defender.",
      "In which order should you perform the actions? To answer, move all actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Enable Security Health Analytics.",
      "From Azure Security Center, add cloud connectors.",
      "Configure the GCP Security Command Center.",
      "Create a dedicated service account and a private key.",
      "Enable the GCP Security Command Center API."
    ],
    answer: [2, 0, 4, 3, 1],
    explanation: {
      correct: [
        "With this cloud connector, Azure Defender reads GCP findings from the Security Command Center of Google, so the work starts on the GCP side. You set up Security Command Center for the organization and enable Security Health Analytics, the service that produces the findings. You then enable the Security Command Center API, so that the findings can be read from outside GCP.",
        "Next you create a dedicated service account for the integration and a private key for it, which is the credential that Azure uses. Only then do you go to Azure Security Center and add the cloud connector, where you supply the organization ID and the private key file."
      ],
      wrong: [
        ["Adding the cloud connector first", "The connector asks for the key of the service account and reads through the API, so both must exist beforehand."],
        ["Creating the service account before enabling the API", "The reference order prepares Security Command Center and its API first, and then the identity that will call it."],
        ["Enabling Security Health Analytics before configuring Security Command Center", "Security Health Analytics is a service of Security Command Center and is enabled as part of setting it up."]
      ],
      concept: "Multicloud onboarding prepares the source cloud first (security service, API, credentials) and connects from Azure last.",
      takeaway: "GCP order: Security Command Center, Security Health Analytics, API, service account and key, then the connector in Azure.",
      refs: [["Microsoft Learn: Connect your GCP project", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/quickstart-onboard-gcp"]]
    }
  },
  {
    id: "Q076", source: 76, type: "single",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Basic",
    caseId: "set-asc-alert", caseOrder: 2,
    stem: [
      "Solution: From Regulatory compliance, you download the report.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The regulatory compliance dashboard shows how the environment measures up to standards such as the Azure Security Benchmark or ISO 27001, and its report summarizes that compliance state. It says nothing about an individual security alert. The steps for resolving an alert are in the alert itself, under Take action, in the Mitigate the threat section."
      ],
      wrong: [
        ["A", "A compliance report describes posture against standards. It contains no remediation steps for a specific alert."]
      ],
      concept: "Regulatory compliance reports posture against standards, while security alerts carry their own remediation guidance.",
      takeaway: "Guidance for an alert is found in the alert, not in the compliance report.",
      refs: [["Microsoft Learn: Manage and respond to security alerts", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/manage-respond-alerts"]]
    }
  },
  {
    id: "Q077", source: 77, type: "single",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Basic",
    caseId: "set-asc-alert", caseOrder: 3,
    stem: [
      "Solution: From Security alerts, you select the alert, select Take Action, and then expand the Mitigate the threat section.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Opening the alert from Security alerts and selecting Take action shows what to do about it. The **Mitigate the threat** section lists the manual remediation steps for this specific alert, which are the recommendations for resolving it. The other sections on the same tab serve other purposes, such as preventing future attacks, triggering an automated response or suppressing similar alerts."
      ],
      wrong: [
        ["B", "Mitigate the threat is the section that shows the remediation steps for the alert, so the solution does meet the goal."]
      ],
      concept: "The Take action tab of an alert separates mitigating the current threat from preventing future attacks, automated responses and suppression.",
      takeaway: "Steps to resolve an alert: Take action, Mitigate the threat.",
      refs: [["Microsoft Learn: Manage and respond to security alerts", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/manage-respond-alerts"]]
    }
  },
  {
    id: "Q078", source: 78, type: "single",
    domain: "ops", topic: "SIEM integration", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that has Azure Defender enabled for all supported resource types.",
      "You need to configure the continuous export of high-severity alerts to enable their retrieval from a third-party security information and event management (SIEM) solution.",
      "To which service should you export the alerts?"
    ],
    options: [
      { key: "A", text: "Azure Cosmos DB" },
      { key: "B", text: "Azure Event Grid" },
      { key: "C", text: "Azure Event Hubs" },
      { key: "D", text: "Azure Data Lake" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Continuous export in Azure Defender can stream alerts and recommendations to two targets: a Log Analytics workspace or Azure Event Hubs. Event Hubs is the target for integration with external tools. You filter the export to high-severity alerts, and the third-party SIEM reads the events from the event hub with its own connector."
      ],
      wrong: [
        ["A", "Cosmos DB is a database. It is not a target of continuous export."],
        ["B", "Event Grid routes events to handlers. It is not offered as a target of continuous export and is not what SIEM connectors read from."],
        ["D", "Data Lake is storage for analytics. It is not a target of continuous export."]
      ],
      concept: "Continuous export sends alerts and recommendations to Log Analytics or to Event Hubs, and Event Hubs is the bridge to third-party SIEM products.",
      takeaway: "Third-party SIEM integration goes through Event Hubs.",
      refs: [["Microsoft Learn: Set up continuous export in the Azure portal", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/continuous-export"]]
    }
  },
  {
    id: "Q079", source: 79, type: "single",
    domain: "respond", topic: "Defender for Cloud", difficulty: "Basic",
    stem: [
      "You are responsible for responding to Azure Defender for Key Vault alerts.",
      "During an investigation of an alert, you discover unauthorized attempts to access a key vault from a Tor exit node.",
      "What should you configure to mitigate the threat?"
    ],
    options: [
      { key: "A", text: "Key Vault firewalls and virtual networks" },
      { key: "B", text: "Azure Active Directory (Azure AD) permissions" },
      { key: "C", text: "role-based access control (RBAC) for the key vault" },
      { key: "D", text: "the access policy settings of the key vault" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "A Tor exit node is a network location, so the mitigation is to restrict where requests to the vault may come from. The Firewalls and virtual networks setting of the key vault limits access to selected virtual networks and IP address ranges. Requests from any other address, including Tor exit nodes, are denied whatever credentials they present."
      ],
      wrong: [
        ["B", "Azure AD permissions govern identities in the directory. They do not filter requests by source address."],
        ["C", "RBAC decides which identities can do what on the vault, not from where."],
        ["D", "Access policies grant identities permissions on keys, secrets and certificates. They are not based on location."]
      ],
      concept: "Identity controls decide who may access a key vault, and network controls decide from where.",
      takeaway: "Access attempts from a bad network location are answered with Key Vault firewalls and virtual networks.",
      refs: [["Microsoft Learn: Configure network security for Azure Key Vault", "https://learn.microsoft.com/en-us/azure/key-vault/general/network-security"]]
    }
  },
  {
    id: "Q080", source: 80, type: "dropdown",
    domain: "ops", topic: "Defender for Cloud", difficulty: "Advanced",
    stem: [
      "You need to use an Azure Resource Manager template to create a workflow automation that will trigger an automatic remediation when specific security alerts are received by Azure Security Center.",
      "How should you complete the portion of the template that will provision the required Azure resources? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    template: `"resources": [
   {
     "type": "{{f1}}/automations",
     "apiVersion": "2019-01-01-preview",
     "name": "[parameters('name')]",
     "location": "[parameters('location')]",
     "properties": {
        "description": "[format(variables('description'), '{0}', parameters
('subscriptionId'))]",
        "isEnabled": true,
        "actions": [
           {
              "actionType": "LogicApp",
              "logicAppResourceId": "[resourceId('ITEM2/workflows', parameters
('appName'))]",
              "uri": "[listCallbackURL(resourceId(parameters('subscriptionId'),
parameters('resourceGroupName'), '{{f2}}/workflows/triggers',
parameters('appName'), 'manual'), '2019-05-01').value]"
           }
        ],`,
    fields: [
      { id: "f1", label: "Resource provider before /automations", options: ["Microsoft.Automation", "Microsoft.Logic", "Microsoft.Security"] },
      { id: "f2", label: "Resource provider before /workflows/triggers", options: ["Microsoft.Automation", "Microsoft.Logic", "Microsoft.Security"] }
    ],
    answer: { f1: 2, f2: 1 },
    explanation: {
      correct: [
        "A workflow automation is a Security Center resource. Its resource type is `Microsoft.Security/automations`, so the provider in the `type` property is `Microsoft.Security`.",
        "The action of the automation runs a logic app. Logic apps are resources of type `Microsoft.Logic/workflows`, and the `uri` property is built by calling `listCallbackURL` on the trigger of the logic app, a resource of type `Microsoft.Logic/workflows/triggers`. The second provider is therefore `Microsoft.Logic`."
      ],
      wrong: [
        ["Microsoft.Automation", "This is the provider of Azure Automation accounts and runbooks. In spite of the similar name, it has no `automations` or `workflows` resource type."],
        ["Microsoft.Logic in the first drop-down", "Logic Apps has no `automations` type. The automation that calls the logic app belongs to Security Center."],
        ["Microsoft.Security in the second drop-down", "`workflows/triggers` belongs to Logic Apps."]
      ],
      concept: "ARM resource types are written as provider/type: Security Center automations are `Microsoft.Security/automations` and logic apps are `Microsoft.Logic/workflows`.",
      takeaway: "The automation is Microsoft.Security. The logic app and its trigger are Microsoft.Logic.",
      refs: [
        ["Microsoft Learn: Microsoft.Security automations template reference", "https://learn.microsoft.com/en-us/azure/templates/microsoft.security/automations"],
        ["Microsoft Learn: Workflow automation in Microsoft Defender for Cloud", "https://learn.microsoft.com/en-us/azure/defender-for-cloud/workflow-automations"]
      ]
    }
  }
);
