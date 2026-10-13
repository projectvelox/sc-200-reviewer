/*
 * Question bank — exam metadata, skill areas and scenario sets.
 * This file is loaded first. The questions follow in bank-01.js, bank-02.js ...
 * (about 16 per file), each of which calls window.EXAM.questions.push(...).
 * Every bank file must be listed in index.html, in order.
 *
 * Text conventions used in every string of the bank:
 *   `text`   inline code
 *   **text** emphasis
 *   \n       line break (table cells)
 *
 * Question (all types):
 *   id          "Q001" ... unique, in source order
 *   source      question number in the PDF, unique and increasing. If the PDF's
 *               numbering restarts (per topic, for example), use the running
 *               position in the file instead.
 *   type        single | multi | yesno | dropdown | order | dragdrop
 *   domain      a key of `domains` below
 *   topic       short topic label, used for the performance breakdown
 *   difficulty  Basic | Intermediate | Advanced
 *   caseId, caseOrder   only for questions that belong to a scenario set
 *   stem        array of blocks. A string is a paragraph. Other blocks:
 *                 { code, label?, note? }            code, JSON, CLI, query
 *                 { table: { head, rows, numeric? } } numeric = right-aligned column indexes
 *                 { list: [] }                        bullet list
 *                 { image, alt }                      file in assets/exhibits/
 *                 { heading }  { note }
 *   explanation { correct: [paragraphs],
 *                 wrong: [[label, reason], ...],
 *                 concept, takeaway, logic?, refs: [[label, url]] }
 *
 * Per type:
 *   single / multi : options [{ key: "A", text?, code? }], answer ["B"] or ["B", "D"];
 *                    multi also needs select: <number of answers>.
 *                    explanation.wrong must have one entry per non-answer option,
 *                    labelled with the option key.
 *   yesno          : statements [{ text, code? }], answer [true, false, ...]
 *   dropdown       : fields [{ id, label, options: [] }], answer { id: optionIndex }.
 *                    Add template (code with {{id}} placeholders) when the
 *                    drop-downs sit inside code.
 *   order          : sourceLabel?, items [], answer [item indexes in sequence]
 *   dragdrop       : sourceLabel, sources [], targets [{ id, label }],
 *                    answer { id: sourceIndex }. Add template for targets inside code.
 *
 * `answer` is always the answer printed in the reference PDF.
 */
window.EXAM = {
  exam: {
    code: "SC-200",
    title: "Microsoft Security Operations Analyst",
    shortTitle: "SC-200 Practice Exam",
    passPercent: 70,
    secondsPerQuestion: 120
  },

  // Skill areas from the exam's official study guide: key -> label.
  domains: {
    ops: "Manage a security operations environment",
    respond: "Respond to security incidents",
    hunt: "Perform threat hunting"
  },

  /*
   * Scenario sets and case studies: questions that share one scenario.
   * The scenario stays on screen in a tabbed pane while the questions change.
   * Leave empty if the PDF has none. Shape:
   *
   *   "set-id": {
   *     id: "set-id",
   *     title: "Scenario set: short description",
   *     shortTitle: "Short name",
   *     noReturn: true,     // true when the PDF says you cannot return to the question
   *     sections: [         // one tab per section, text taken from the PDF
   *       { id: "overview", title: "Overview", blocks: [ ...stem blocks... ] },
   *       { id: "scenario", title: "Scenario", blocks: [ { heading: "Requirements" }, "..." ] },
   *       { id: "exhibit",  title: "Exhibit",  blocks: [ { code: "...", label: "..." } ] }
   *     ]
   *   }
   */
  cases: {
    "set-mdi-accounts": {
      id: "set-mdi-accounts",
      title: "Scenario set: Defender for Identity integration with Active Directory",
      shortTitle: "Defender for Identity accounts",
      noReturn: true,
      sections: [
        { id: "overview", title: "Overview", blocks: [
          "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.",
          "After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen."
        ] },
        { id: "scenario", title: "Scenario", blocks: [
          "You are configuring Microsoft Defender for Identity integration with Active Directory.",
          "From the Microsoft Defender for identity portal, you need to configure several accounts for attackers to exploit."
        ] }
      ]
    },

    "case-fabrikam": {
      id: "case-fabrikam",
      title: "Case study: Fabrikam, Inc.",
      shortTitle: "Fabrikam",
      noReturn: false,
      sections: [
        { id: "case-study", title: "Case study", blocks: [
          "This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.",
          "To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.",
          "At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.",
          { heading: "To start the case study" },
          "To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question."
        ] },
        { id: "overview", title: "Overview", blocks: [
          "Fabrikam, Inc. is a financial services company.",
          "The company has branch offices in New York, London, and Singapore. Fabrikam has remote users located across the globe. The remote users access company resources, including cloud resources, by using a VPN connection to a branch office."
        ] },
        { id: "existing", title: "Existing Environment", blocks: [
          { heading: "Identity Environment" },
          "The network contains an Active Directory Domain Services (AD DS) forest named fabrikam.com that syncs with an Azure AD tenant named fabrikam.com. To sync the forest, Fabrikam uses Azure AD Connect with pass-through authentication enabled and password hash synchronization disabled.",
          "The fabrikam.com forest contains two global groups named Group1 and Group2.",
          { heading: "Microsoft 365 Environment" },
          "All the users at Fabrikam are assigned a Microsoft 365 E5 license and an Azure Active Directory Premium Plan 2 license.",
          "Fabrikam implements Microsoft Defender for Identity and Microsoft Defender for Cloud Apps and enables log collectors.",
          { heading: "Azure Environment" },
          "Fabrikam has an Azure subscription that contains the resources shown in the following table.",
          { table: {
            head: ["Name", "Type", "Description"],
            rows: [
              ["App1", "Azure logic app", "To automate incident generation in an internal ticketing system, the security operations (SecOps) team invokes App1 by using an HTTP endpoint."],
              ["SAWkspc1", "Azure Synapse Analytics workspace", "SAWkspc1 hosts an Apache Spark pool named Pool1."],
              ["LAWkspc1", "Log Analytics workspace", "LAWkspc1 will be used in a planned Microsoft Sentinel implementation."]
            ]
          } },
          { heading: "Amazon Web Services (AWS) Environment" },
          "Fabrikam has an Amazon Web Services (AWS) account named Account1. Account1 contains 100 Amazon Elastic Compute Cloud (EC2) instances that run a custom Windows Server 2022. The image includes Microsoft SQL Server 2019 and does NOT have any agents installed.",
          { heading: "Current Issues" },
          "When the users use the VPN connections, Microsoft 365 Defender raises a high volume of impossible travel alerts that are false positives.",
          "Defender for Identity raises a high volume of Suspected DCSync attack alerts that are false positives."
        ] },
        { id: "requirements", title: "Requirements", blocks: [
          { heading: "Planned changes" },
          "Fabrikam plans to implement the following services:",
          { list: ["Microsoft Defender for Cloud", "Microsoft Sentinel"] },
          { heading: "Business Requirements" },
          "Fabrikam identifies the following business requirements:",
          { list: ["Use the principle of least privilege, whenever possible.", "Minimize administrative effort."] },
          { heading: "Microsoft Defender for Cloud Apps Requirements" },
          "Fabrikam identifies the following Microsoft Defender for Cloud Apps requirements:",
          { list: [
            "Ensure that impossible travel alert policies are based on the previous activities of each user.",
            "Reduce the amount of impossible travel alerts that are false positives."
          ] },
          { heading: "Microsoft Defender for Identity Requirements" },
          "Minimize the administrative effort required to investigate the false positive alerts.",
          { heading: "Microsoft Defender for Cloud Requirements" },
          "Fabrikam identifies the following Microsoft Defender for Cloud requirements:",
          { list: [
            "Ensure that the members of Group2 can modify security policies.",
            "Ensure that the members of Group1 can assign regulatory compliance policy initiatives at the Azure subscription level.",
            "Automate the deployment of the Azure Connected Machine agent for Azure Arc-enabled servers to the existing and future resources of Account1.",
            "Minimize the administrative effort required to investigate the false positive alerts."
          ] },
          { heading: "Microsoft Sentinel Requirements" },
          "Fabrikam identifies the following Microsoft Sentinel requirements:",
          { list: [
            "Query for NXDOMAIN DNS requests from the last seven days by using built-in Advanced Security Information Model (ASIM) unifying parsers.",
            "From AWS EC2 instances, collect Windows Security event log entries that include local group membership changes.",
            "Identify anomalous activities of Azure AD users by using User and Entity Behavior Analytics (UEBA).",
            "Evaluate the potential impact of compromised Azure AD user credentials by using UEBA.",
            "Ensure that App1 is available for use in Microsoft Sentinel automation rules.",
            "Identify the mean time to triage for incidents generated during the last 30 days.",
            "Identify the mean time to close incidents generated during the last 30 days.",
            "Ensure that the members of Group1 can create and run playbooks.",
            "Ensure that the members of Group1 can manage analytics rules.",
            "Run hunting queries on Pool1 by using Jupyter notebooks.",
            "Ensure that the members of Group2 can manage incidents.",
            "Maximize the performance of data queries.",
            "Minimize the amount of collected data."
          ] }
        ] }
      ]
    },

    "case-litware": {
      id: "case-litware",
      title: "Case study: Litware Inc.",
      shortTitle: "Litware",
      noReturn: false,
      sections: [
        { id: "case-study", title: "Case study", blocks: [
          "This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.",
          "To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.",
          "At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.",
          { heading: "To start the case study" },
          "To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question."
        ] },
        { id: "overview", title: "Overview", blocks: [
          "Litware Inc. is a renewable energy company.",
          "Litware has offices in Boston and Seattle. Litware also has remote users located across the United States. To access Litware resources, including cloud resources, the remote users establish a VPN connection to either office."
        ] },
        { id: "existing", title: "Existing Environment", blocks: [
          { heading: "Identity Environment" },
          "The network contains an Active Directory forest named litware.com that syncs to an Azure Active Directory (Azure AD) tenant named litware.com.",
          { heading: "Microsoft 365 Environment" },
          "Litware has a Microsoft 365 E5 subscription linked to the litware.com Azure AD tenant. Microsoft Defender for Endpoint is deployed to all computers that run Windows 10. All Microsoft Defender for Cloud Apps built-in anomaly detection policies are enabled.",
          { heading: "Azure Environment" },
          "Litware has an Azure subscription linked to the litware.com Azure AD tenant. The subscription contains resources in the East US Azure region as shown in the following table.",
          { table: {
            head: ["Name", "Type", "Description"],
            rows: [
              ["LA1", "Log Analytics workspace", "Contains logs and metrics collected from all Azure resources and on-premises servers"],
              ["VM1", "Virtual machine", "Server that runs Windows Server 2019"],
              ["VM2", "Virtual machine", "Server that runs Ubuntu 18.04 LTS"]
            ]
          } },
          { heading: "Network Environment" },
          "Each Litware office connects directly to the internet and has a site-to-site VPN connection to the virtual networks in the Azure subscription.",
          { heading: "On-premises Environment" },
          "The on-premises network contains the computers shown in the following table.",
          { table: {
            head: ["Name", "Operating system", "Office", "Description"],
            rows: [
              ["DC1", "Windows Server 2019", "Boston", "Domain controller in litware.com that connects directly to the internet"],
              ["CLIENT1", "Windows 10", "Boston", "Domain-joined client computer"]
            ]
          } },
          { heading: "Current Problems" },
          "Microsoft Defender for Cloud Apps frequently generates false positive alerts when users connect to both offices simultaneously."
        ] },
        { id: "requirements", title: "Planned Changes and Requirements", blocks: [
          { heading: "Planned Changes" },
          "Litware plans to implement the following changes:",
          { list: [
            "Create and configure Microsoft Sentinel in the Azure subscription.",
            "Validate Microsoft Sentinel functionality by using Azure AD test user accounts."
          ] },
          { heading: "Business Requirements" },
          "Litware identifies the following business requirements:",
          { list: [
            "The principle of least privilege must be used whenever possible.",
            "Costs must be minimized, as long as all other requirements are met.",
            "Logs collected by Log Analytics must provide a full audit trail of user activities.",
            "All domain controllers must be protected by using Microsoft Defender for Identity."
          ] },
          { heading: "Azure Information Protection Requirements" },
          "All files that have sensitivity labels and are stored on the Windows 10 computers must be available from the Azure Information Protection – Data discovery dashboard.",
          { heading: "Microsoft Defender for Endpoint Requirements" },
          "All Microsoft Defender for Cloud Apps unsanctioned apps must be blocked on the Windows 10 computers by using Microsoft Defender for Endpoint.",
          { heading: "Microsoft Defender for Cloud Apps Security Requirements" },
          "Microsoft Defender for Cloud Apps must identify whether a user connection is anomalous based on tenant-level data.",
          { heading: "Microsoft Defender for Cloud Requirements" },
          "All servers must send logs to the same Log Analytics workspace.",
          { heading: "Microsoft Sentinel Requirements" },
          "Litware must meet the following Microsoft Sentinel requirements:",
          { list: [
            "Integrate Microsoft Sentinel and Microsoft Defender for Cloud Apps.",
            "Ensure that a user named admin1 can configure Microsoft Sentinel playbooks.",
            "Create a Microsoft Sentinel analytics rule based on a custom query. The rule must automatically initiate the execution of a playbook.",
            "Add notes to events that represent data access from a specific IP address to provide the ability to reference the IP address when navigating through an investigation graph while hunting.",
            "Create a test rule that generates alerts when inbound access to Microsoft Office 365 by the Azure AD test user accounts is detected. Alerts generated by the rule must be grouped into individual incidents, with one incident per test user account."
          ] }
        ] }
      ]
    },

    "set-passive-av": {
      id: "set-passive-av",
      title: "Scenario set: Devices with a third-party antivirus product",
      shortTitle: "Third-party antivirus devices",
      noReturn: true,
      sections: [
        { id: "overview", title: "Overview", blocks: [
          "Note: This section contains one or more sets of questions with the same scenario and problem. Each question presents a unique solution to the problem. You must determine whether the solution meets the stated goals. More than one solution in the set might solve the problem. It is also possible that none of the solutions in the set solve the problem.",
          "After you answer a question in this section, you will NOT be able to return. As a result, these questions do not appear on the Review Screen."
        ] },
        { id: "scenario", title: "Scenario", blocks: [
          "You have a Microsoft 365 subscription.",
          "You have 1,000 Windows devices that have a third-party antivirus product installed and Microsoft Defender Antivirus in passive mode.",
          "You need to ensure that the devices are protected from malicious artifacts that were undetected by the third-party antivirus product."
        ] }
      ]
    },

    "set-asc-alert": {
      id: "set-asc-alert",
      title: "Scenario set: Security alert in Azure Security Center",
      shortTitle: "Security Center alert",
      noReturn: true,
      sections: [
        { id: "overview", title: "Overview", blocks: [
          "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.",
          "After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen."
        ] },
        { id: "scenario", title: "Scenario", blocks: [
          "You use Azure Security Center.",
          "You receive a security alert in Security Center.",
          "You need to view recommendations to resolve the alert in Security Center."
        ] }
      ]
    }
  },

  questions: []
};
