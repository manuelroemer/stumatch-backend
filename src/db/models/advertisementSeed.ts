import { Advertisement } from './advertisement';
import faker from 'faker';

export const advertisementSeed: Array<Advertisement> = [
  {
    id: '40000000-0000-1000-8000-000000000001',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudentin (m/w/d) oder Praktikantin (m/w/d) für Webentwicklung',
    shortDescription: 'Studenten ab dem 3. Semester für Entwicklung und Testing gesucht!',
    content:
      'Du studierst Informatik, Wirtschaftsinformatik oder einen vergleichbaren Studiengang. \nDu hast Freude an Entwicklungstätigkeiten. \nDu hast bereits praktische Erfahrungen mit Webentwicklung, idealerweise Angular, sammeln können. \nGit und Docker sind keine Fremdwörter für Dich.\nDu bestichst durch hohe Zuverlässigkeit sowie eine selbständige und strukturierte Arbeitsweise.',
    facultyId: '20000000-0000-1000-8000-000000000000',
    startDate: new Date('2021-07-20T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    status: 'unverified',
  },
  {
    id: '40000000-0000-1000-8000-000000000002',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Praktikant (m/w/d) Hardware und Software-Entwicklung für Software-Defined-Radio Gerätetests',
    shortDescription: '6-12 Wochen Praktikum, Studenten aller Semester willkommen',
    content:
      'Aufgaben: *HF- & Audio-Verschaltung der Radios und Messgeräte im Labornet\nSchaltungsentwurf für Signalanpassungen\n*Erstellung von Steuerscripten für Raspberry Pi mit Python\n*Testframework-Scripting mit Python\n*Feldtest-Unterstützung\nProfil:\n*Studium der Elektrotechnik, Technischen Informatik oder einer vergleichbaren Studienrichtung\n*Grundkenntnisse in Python sowie in HF & Audio\n*Zuverlässige und strukturierte Arbeitsweise gepaart mit Organisationstalent\n*Freude an der Arbeit im Team als auch in Eigenverantwortung\n*Gute Deutsch- und Englischkenntnisse in Wort und Schrif',
    facultyId: '20000000-0000-1000-8000-000000000000',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000003',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent (m/w/d) Windows Software & Security',
    shortDescription: 'fehlersuche, analyse, client management',
    content:
      'Aufgaben:\n*Eigenständige Fehlersuche am Windows Client in Abstimmung mit dem Anwender\n*Analyse von Softwareinstallationsfehlern sowie von Windows 10-Berechtigungsproblemen\n*Umgang mit unseren Client Management Tools\nProfil:\n*Studium der Informatik oder einer vergleichbaren Studienrichtung\n*Gute Windows-Betriebssystem Kenntnisse (Services, Dateiregistrierung, Berechtigungen, Event Log, UAC)\n*Grundlegendes Verständnis für Software-Installationen\n*Begeisterung für First-Level-Support und Kommunikation mit internen IT-Mitarbeitern und Endanwendern\n*Neugierde und Freude am Experimentieren mit neuen Technologien\n*Analytisches Denken sowie sorgfältige, effiziente und eigenständige Arbeitsweise\n*Gute Deutsch- und Englischkenntnisse in Wort und Schrift\n',
    facultyId: '20000000-0000-1000-8000-000000000001',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000000557',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000004',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Working Student (m/f/d) for Quantitative Development in Group Risk, part-time, limited - 6-24 months',
    shortDescription: 'limited to 6-24 months, start oct, part-time 15-20hrs',
    content:
      'Key Responsibilities\n-Development of Bokeh applications and Jupyter notebooks for monitoring of capital markets data\n-Implement and test machine learning approaches for market data quality assurance\n-Growing our methodological code base while curating the documentation\n\nQualifications\n-Currently working towards a university degree (preferably Master) in mathematics, computer science, physics or a related field\n-Programming experience using e.g. Python (ideally showcasing public projects on GitHub or Kaggle)\n-Knowledge of database technologies (SQL) and version control systems (git)\n\nExperience & Key skills\n-Strong analytical and conceptual capabilities\n-Independent and outcome-oriented working style\n\n',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000000555',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000005',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Kassierer(m/f/d)',
    shortDescription: 'Kassieren und Regale auffüllen',
    content:
      'Key Responsibilities\n-Development of Bokeh applications and Jupyter notebooks for monitoring of capital markets data\n-Implement and test machine learning approaches for market data quality assurance\n-Growing our methodological code base while curating the documentation\n\nQualifications\n-Currently working towards a university degree (preferably Master) in mathematics, computer science, physics or a related field\n-Programming experience using e.g. Python (ideally showcasing public projects on GitHub or Kaggle)\n-Knowledge of database technologies (SQL) and version control systems (git)\n\nExperience & Key skills\n-Strong analytical and conceptual capabilities\n-Independent and outcome-oriented working style\n\n',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000000556',
    status: 'unverified',
  },
  {
    id: '40000000-0000-1000-8000-000000000006',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent / Praktikant (m/w/d) Corporate Development',
    shortDescription:
      'Wir suchen eine/n motivierte/n WerkstudentIn oder PraktikantIn (m/w/d) für unseren Bereich Corporate Development.',
    content:
      'Wir suchen eine/n motivierte/n WerkstudentIn oder PraktikantIn (m/w/d) für unseren Bereich Corporate Development. Das Corporate Development Team ist für alle strategischen Aktivitäten und Business Development Themen innerhalb von cellcentric verantwortlich und berichtet direkt an den CEO. Die Tätigkeiten reichen von der (Weiter-) Entwicklung der Unternehmensstrategie und Begleitung aller Funktionalstrategien über die kontinuierliche Beobachtung neuer Marktentwicklungen und des Wettbewerbs bis hin zur Leitung strategischer Projekte (z.B. Gestaltung des Change Management & Kulturprozesses, Prozessoptimierung etc.).\n\nDu hast Lust, unser Corporate Development Team bei seiner täglichen Arbeit zu unterstützen und die Zukunft von cellcentric aktiv mitzugestalten? Du bist auf der Suche nach neuen Herausforderungen und willst praktische Erfahrungen für deine berufliche Zukunft sammeln? Wenn ja, freuen wir uns auf deine Bewerbung!\n\nKernaufgaben:\n\n \n\nDu übernimmst eigenständig Verantwortung für Arbeitspakete in strategischen Initiativen und Projekten\nDu konzipierst und erstellst selbstständig Präsentationen und Unterlagen zum Markt und Wettbewerb sowie weitere Entscheidungsunterlagen für diverse Top Management Gremien bis hin zu unserem Aufsichtsrat\nDu kümmerst dich um die Recherche von markt- und wettbewerbsrelevanten Informationen – sowohl für unseren unternehmensweiten Market-Intelligence-Newsletter, als auch für die Erstellung von Markt- und Wettbewerbsanalysen für Management-Reports\nDu bist verantwortlich für die Vorbereitung, Erstellung und den Versand unseres zweiwöchentlich erscheinenden, unternehmensweiten Newsletters\nDu kümmerst dich um organisatorische und administrative Aufgaben (z.B. die Organisation von internen Workshops und Meetings)',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001021',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000007',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent Transactions (m/w/d)',
    shortDescription:
      'WIR BRAUCHEN SIE FÜR UNSER TEAM DER PATRIZIA AG - BEREICH TRANSACTIONS - AM STANDORT AUGSBURG ZUM NÄCHSTMÖGLICHEN ZEITPUNKT!',
    content:
      'Ihr Aufgabengebiet \nMitarbeit bei administrativen Tätigkeiten des Investmentprozesses \nUnterstützung bei der Entwicklung und Pflege von Cashflow-Modellen und Businessplänen \nMitarbeit bei der Erfassung von Angeboten in SAP \nUnterstützung der Investmentmanager im laufenden Ankaufsprozess \nUnterstützung bei verschiedenen Analysen und Auswertungen \nIhr Profil \nImmatrikulierter Student (m/w/d) im Bereich (Wirtschafts-)Mathematik, (Wirtschafts-)Informatik, BWL/VWL oder eines vergleichbaren Hochschulstudiengangs \nInteresse an der Erstellung von Businessplänen und Renditemodellen \nGute Kenntnisse in Excel, Kenntnisse in VBA-Programmierung von Vorteil \nGute Englisch-Kenntnisse \nSchnelle Auffassungsgabe, ausgezeichnetes analytisches Denkvermögen, Zahlenaffinität und gute Kommunikations- und Teamfähigkeit',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001022',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000008',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent AI - Platform Services (m/w/d)',
    shortDescription:
      'Als Werkstudent bei AI Platform Services hilfst du uns, künstliche Intelligenz im Bereich des Video Minings weiter zu etablieren und somit den Digitalisierungsprozess innerhalb von ProSiebenSat.1 weiter voranzutreiben.',
    content:
      'Das erwartet dich \nAls Werkstudent bei AI Platform Services hilfst du uns, künstliche Intelligenz im Bereich des Video Minings weiter zu etablieren und somit den Digitalisierungsprozess innerhalb von ProSiebenSat.1 weiter voranzutreiben. \n \nDas erwartet dich bei uns \nDu triffst auf ein internationales Team mit einem breiten Erfahrungsschatz \nDich erwartet eine Kultur des Vertrauens und der gemeinsamen Verant\nung \nDu kannst deine Erfahrungen und Ideen in Lösungen umsetzen \nDu verwendest moderne Technologien wie Cloud ML Services und Kubernetes \nDas bringst du mit \nDu hast erste Programmiererfahrung, am besten mit Python \nDu besitzt SQL-Kenntnisse und kannst mit relationalen Datenbanken umgehen \nDatenanalysen machen dir Spaß und AI ist ein Gebiet das dich interessiert \nDu hast ein agiles Mindset und arbeitest gerne im Team \nEnglischkenntnisse in \n und Schrift runden dein Profil ab, Deutschkenntnisse sind von Vorteil \nDas bieten wir dir \nErhalte Einblicke in unsere Geschäftsbereiche und erweitere in eigenständigen Projekten deine Fachkompetenz, um dich auf deinen Berufseinstieg vorzubereiten \nFreue dich auf eine offene Unternehmenskultur, per „Du" und ohne Dresscode im dynamischen Umfeld der Medienbranche \nArbeite an modern ausgestatteten Arbeitsplätzen, profitiere von unseren diversen Sonderrabatten bei externen Partnern und nutze unser großes Sportangebot auf dem Campus (u. a. Yoga, Fußball oder Workouts) \nDamit du auch außerhalb von deinem Bereich neue Leute kennenlernst und einen Einblick in andere Tätigkeitsfelder bekommst, bieten wir ein weitreichendes Praktikanten- und Werkstudentennetzwerk. Auch nach deinem Praktikum kannst du mit uns vernetzt bleiben und Teil unseres Talentpools werden \nKontakt \nWir freuen uns auf deine Bewerbung! \n \nBewirb dich innerhalb von 5 Minuten über unser Jobportal oder nutze die Möglichkeit zur Videobewerbung. \n \nMehr zu unserem Bewerbungsprozess findest du hier. \n \nInformiere dich hier über die ProSiebenSat.1 Group und unser vielseitiges Portfolio. \n \nAls Unterzeichner der Charta der Vielfalt, setzt sich ProSiebenSat.1 für ein vorurteilsfreies Arbeitsumfeld ein und fördert aktiv die Vielfalt sowie Chancengleichheit unter den Beschäftigten. \n \nDu hast eine Behinderung und möchtest dich bewerben? Dann bist du bei uns herzlich willkommen. \nWir wissen, dass wir noch nicht gänzlich barrierefrei sind, aber wir arbeiten daran. Lass uns darüber reden, wie wir diese Barriere gemeinsam abschaffen und wenn nötig eine individuelle Lösung finden können. \n \nAusschließlich aus Gründen der besseren Lesbarkeit wird nur die männliche Form verwendet. Selbstverständlich sind immer alle Geschlechter angesprochen.',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001023',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000009',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Aushilfen, Werkstudenten (m/w/d) für den Probeneingang',
    shortDescription:
      'Im Mittelpunkt unserer Arbeit steht die Verantwortung für Menschen mit einer Leukämieerkrankung. Wollen Sie uns dabei unterstützen?',
    content:
      'Einleitung \nIm Mittelpunkt unserer Arbeit steht die Verantwortung für Menschen mit einer Leukämieerkrankung. Wollen Sie uns dabei unterstützen? \n \nDas Münchner Leukämielabor stellt eine national wie international führende Institution im Bereich der Leukämiediagnostik und -forschung dar. Als stark wachsendes Unternehmen in einer hochinnovativen Branche messen wir der kontinuierlichen Weiterentwicklung unserer Mitarbeiter und unserer technologischen Konzepte höchste Bedeutung bei. \nZur Verstärkung unseres engagierten Teams im Probeneingang suchen wir ab sofort: \n \nIhre Aufgaben \nSie unterstützen uns im Probeneingang beim Auspacken und Sortieren der eingehenden Proben und ggf. der Datenerfassung \nSie übernehmen darüber hinaus verschiedene weitere Aufgaben, wie z.B. das Archivieren von Objektträgern, das Auffüllen von Verbrauchsmaterial oder die Vorbereitung von Verpackungsmaterial für den Versand \nIhre Aufgaben fallen täglich (Di-Sa.) zwischen 8:00 Uhr und ca. 11:30 Uhr an \nIhr Profil \nSie verfügen über eine abgeschlossene Schulausbildung und idealerweise über erste Berufserfahrung und sind immatrikuliert \nEine verantwortungsbewusste und zuverlässige Arbeitsweise bringen Sie mit \nSie sind motiviert, ausdauernd, belastbar und arbeiten gerne im Team \nSehr gute Deutschkenntnisse in Wort und Schrift runden Ihr Profil ab \nWir bieten \nIhre abwechslungsreiche Tätigkeit erfolgt in enger Kooperation mit den laboreigenen Diagnostikbereichen. \n \nSie erhalten eine intensive Einarbeitung in die Abläufe und einen herausfordernden und abwechslungsreichen Arbeitsplatz in einem der modernsten Diagnostiklabore. Sie arbeiten im Team mit flachen Hierarchien in einem dynamischen und freundlichen Umfeld und leisten einen wertvollen Beitrag. \n \nSie erwartet ein freundliches und professionelles Team, ein Schnuppertag während der Bewerbungsphase und eine hervorragende öffentliche Anbindung',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001024',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000010',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent (m/w/d) Java-Programmierung',
    shortDescription: 'Hier erwartet dich ein motiviertes Team, um in der Testautomatisierung erfolgreich zu starten.',
    content:
      'AOK PLUS – Die Gesundheitskasse für Sachsen und Thüringen. \nDie AOK PLUS ist mit mehr als 3,4 Millionen Versicherten die sechstgrößte gesetzliche Krankenkasse in Deutschland. In Sachsen und Thüringen versichern wir als Marktführer über 50% der Menschen und verfügen über ein Netz von mehr als 140 Filialen. 7.000 Beschäftigte arbeiten jeden Tag an unserer Mission Gesundheit. Wir wollen uns als Gestalter im Gesundheitssystem etablieren und damit für Versicherte und medizinisches Personal einen echten Mehrwert bieten. \n \nWir suchen an unserem Standort in Dresden zunächst bis 31.12.2022 befristet einen \n \nWerkstudent (m/w/d) Java-Programmierung \n \nPraktische Erfahrung gehört zum Studium, insbesondere in der Informatik. Wenn du mit der Programmiersprache Java vertraut bist, kannst du Arbeitserfahrungen bei der AOK PLUS sammeln. Hier erwartet dich ein motiviertes Team, um in der Testautomatisierung erfolgreich zu starten. \n \nVielfältige Aufgaben erwarten Dich \nTest-Automatisierung für die App-Anwendungen \nProgrammierung von Tests in Cucumber (als Grundlage für manuelle und automatisierte Durchführung) \nStrukturierung und Erfassung des Programmcodes in einem Ticket-System (JIRA) \nProgrammierung von Test-Schritten in Java \nFehlersuche und –behebung im Programmcode \nDas bringst Du mit \nDu studierst Informatik, Wirtschafts-/ Medieninformatik, Informationssystemtechnik, mindestens im 2. Semester. \nDu hast Java Grundkenntnisse, idealerweise bringst du Erfahrungen mit Unix-basierten Betriebssystemen mit. \nDu arbeitest gern in Projekten und bevorzugst Teamarbeit. \nDas sind Deine Vorteile \ninteressante Tätigkeit mit 15 bis 20 Stunden pro Woche \nVergütung 17,83 €/Stunde \nmoderne Arbeitsplatzausstattung \nDeine Fragen beantworten wir gern \nbis 16.08.2021 Stefan Kupferschmidt (Tel. 0921 7871-22547 / Mail: stefan.kupferschmidt@plus.aok.de)  \nab 17.08.2021 Matthias Winkler (Tel. 01520 1570585 / Mail: matthias.winkler@plus.aok.de) \nDeine Bewerbung \n \nHaben wir dein Interesse geweckt? Dann freuen wir uns auf deine online-Bewerbung bis zum 27.08.2021. \n \nJETZT BEWERBEN \n \nSchwerbehinderte Menschen werden bei gleicher Eignung bevorzugt berücksichtigt. \n \nWerde Teil unserer Mission Gesundheit!',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001025',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000011',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent (m/w/d) Schadensachbearbeitung Versicherungsrecht',
    shortDescription:
      'Werde zum nächstmöglichen Zeitpunkt Teil unseres engagierten Teams als Werkstudent (m/w/d) Schadensachbearbeitung Versicherungsrecht.',
    content:
      'Einleitung \nDie Celle-Uelzen Netz GmbH (CUN) betreibt moderne und verlässliche Netze für die Versorgung mit Strom, Erdgas, Wasser und Glasfaser-Internet. Sie gehört zur SVO-Gruppe und hat ihren Hauptsitz in Celle im Herzen Niedersachsens, nahe der Landeshauptstadt Hannover. Mit rund 400 Mitarbeitern ist die SVO-Gruppe einer der größten Arbeitgeber in der Region um Celle und Uelzen. Unsere Experten kümmern sich täglich 24 Stunden um den Betrieb und die Überwachung der Energie- und Telekommunikationsnetze. \n \nWerde zum nächstmöglichen Zeitpunkt Teil unseres engagierten Teams als Werkstudent (m/w/d) Schadensachbearbeitung Versicherungsrecht. \n \nDeine Aufgaben \nDu bearbeitest die Betriebshaftpflichtfälle aller Art der CUN \nDu sorgst für die reibungslose Korrespondenz mit den Geschädigten, unseren Kunden, den Versicherungen sowie Anwälten und Gutachtern \nDu wirst ein Ansprechpartner für dieses Aufgabenfeld und arbeitest eng mit unserem Team zusammen \nDein Profil \nDu verfügst über erste juristische Grundkenntnisse im Rahmen deines derzeitigen Studiums der Rechtswissenschaften oder des Wirtschaftsrechts \nDu verfügst über gute EDV-Kenntnisse \nDu bist kommunikativ, zuverlässig und ein wahrer Teamplayer \nDeine Gewissenhaftigkeit, deine strukturierte Arbeitsweise und gute Auffassungsgabe zeichnen dich aus \nWeitere Informationen \nWenn wir dich mit dieser anspruchsvollen Aufgabe in einem dynamischen Umfeld angesprochen \nhaben, bewirb dich bitte unter Angabe des frühesten Eintrittstermins per E-Mail an personal@cunetz.de. \nFragen beantwortet dir gerne Gunter Dietert telefonisch unter 05141/16-1240. \n \n \n \nCelle-Uelzen Netz GmbH \nPersonal, Organisation \nSprengerstraße 2 \n29223 Celle \npersonal@cunetz.de',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001026',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-000000000012',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent (w/m/d) OpEx.DE / Operational Excellence',
    shortDescription:
      'Zur Verstärkung unseres Teams in Düsseldorf suchen wir ab sofort für die Position Werkstudent (w/m/d) OpEx.DE / Operational Excellence',
    content:
      'Die Theorie beherrschst Du perfekt. Und die Praxis? Bei HSBC Deutschland machen wir Dich bereit für die Finanzwelt! Sei bei uns von Anfang an Teil eines Teams, unterstütze Kolleginnen und Kollegen aus verschiedenen Ländern und arbeite an Deinen eigenen Projekten. Wir bieten Dir Freiraum und Eigenverantwortung: lerne HSBC bereits im Studium kennen und finde heraus, was für Dich möglich ist. \n \nDie HSBC Transaction Services GmbH gehört zu den führenden Dienstleistern im deutschen Markt für Wertpapierabwicklung. Auf Basis modernster Technologie bieten wir ein breites Spektrum erstklassiger Leistungen und maßgeschneiderter Services. Servicequalität, Flexibilität und Kosteneffizienz zeichnen die Arbeitsweise unserer engagierten Mitarbeiter aus. Werde Teil unseres Erfolgs! \n \nZur Verstärkung unseres Teams in Düsseldorf suchen wir ab sofort für die Position \n \nWerkstudent (w/m/d) OpEx.DE / Operational Excellence \n \nDein Aufgabenbereich: \nOpEx.DE ist ein Programm zur Effizienzsteigerung und bietet Hilfe zur Selbsthilfe um Prozesse und Teamstrukturen zu optimieren, Abläufe zu verschlanken, Standards nachhaltig aufzubauen und Messbarkeit her- bzw. sicherzustellen. \nWesentliche Elemente des Programms sind Trainings und Ausbildungsreihen sowie die Begleitung von Six Sigma Projekten \n \nim Rahmen des Praktikums bist Du Teil des Team und wirst \nPraxiserfahrungen sammeln in organisatorischen und kommunikativen Aufgaben bei der Planung und Umsetzung der Trainingsformate und \nVerantwortung übernehmen bei der selbständigen Bearbeitung von Aufgabenpaketen, wie bspw. der Konzeption von Schulungsunterlagen oder der Erstellung von Präsentationen und Reportings \nDas bringst Du mit: \nfortgeschrittenes Hochschulstudium \ngute Kenntnisse in MS Excel, Powerpoint, OneNote und Erfahrungen mit Social Intranet Plattformen (z.B. Confluence) \nKreativität und Eigeninitiative \nSozialkompetenz und souveränes Auftreten \nSorgfalt und Verantwortungsbewusstsein \nsicherer Gebrauch der deutschen und englischen Sprache in Wort und Schrift \nDas bieten wir Dir: \nNetworking Events: Erweitere Dein Netzwerk durch die Teilnahme an AfterWork Events oder dem gemeinsamen Lunch und bleibe auch nach deinem Praktikum/Werkstudententätigkeit durch das HSBC Talents Programm mit uns in Kontakt. \n \nVielfältiger Praxiseinblick: Dich erwarten abwechslungsreiche und anspruchsvolle Tätigkeiten, sowie die Möglichkeit Dich auszuprobieren und zu orientieren. \n \nBetriebsrestaurant und Mitarbeitercafe: Egal ob Lunch oder einen Kaffee zwischendurch – durch unser vergünstigtes Betriebsrestaurant und Café bist Du den gesamten Tag versorgt, von Frühstück über Lunch bis hin zu Snacks für den kleinen Hunger. \n \nBusiness Rotation: Als Praktikant (m/w/d) oder Werkstudent (m/w/d) hast Du die Möglichkeit einen Tag pro Monat Deinen Bereich zu verlassen, um eine andere Abteilung kennenzulernen und Dein HSBC Netzwerk zu erweitern. \n \nWir bei HSBC Deutschland möchten, dass sich alle Mitarbeiterinnen und Mitarbeiter unserem Hause zugehörig fühlen, fair behandelt werden und dass Meinungen gehört und berücksichtigt werden – unabhängig von Geschlecht, Alter, Nationalität, Familiensituation, Religion, Behinderung, sexueller Orientierung oder ethnischer und sozialer Herkunft. \n \nDein Kontakt \nWir sind gespannt darauf Sie kennenzulernen und freuen uns auf Ihre vollständige Onlinebewerbung (inklusive Lebenslauf, Anschreiben und Zeugnissen). \nFür Rückfragen stehen wir Ihnen selbstverständlich gerne zur Verfügung. Unsere Kontaktdaten finden Sie untenstehend. \n \nKai Blumenschein \nExpert Talent Acquisition',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001027',
    status: 'verified',
  },
  {
    id: '40000000-0000-1000-8000-0000000000013',
    authorId: '00000000-0000-1000-8000-000000000000',
    title: 'Werkstudent (m/w/d) - Trainings, interne Kommunikation und Social Media',
    shortDescription:
      'bewirb dich jetzt bei uns als Werkstudent (m/w/d) - Trainings, interne Kommunikation und Social Media!',
    content: 'Das sind wir! \nZielgerichtet, zugewandt, direkt begeistert! Mit unseren rund 250 Mitarbeitenden an 9 Standorten in Europa helfen wir unseren Kunden die Potenziale der Digitalisierung auszuschöpfen und ihr Geschäft voranzubringen. Wie das geht? Wir stehen für maßgeschneiderte IT-Beratung, Softwareentwicklung und Begleitung hin zu agilen Unternehmensorganisationen. Unsere Projekte werden zu 100 % agil umgesetzt, denn bei uns ist "Agilität" nicht nur ein Schlagwort. Sie ist Teil unserer DNA! Unseren Erfolg verdanken wir dabei jedem einzelnen Mitarbeitenden. Ihre Kompetenz ist das Fundament, auf dem wir aufbauen. Für den Erfolg unserer Kunden entwickeln wir uns weiter - Tag für Tag! \n \nDeine Herausforderung \nDu hast Lust, einen ganzheitlichen Einblick in die Bereiche Training, Marketing und Vertrieb zu bekommen? Organisation und zielgruppenspezifische Ansprachen sind deine große Stärke? Dann bewirb dich jetzt bei uns als Werkstudent (m/w/d) - Trainings, interne Kommunikation und Social Media! \n \nDu unterstützt unser Trainingsteam im Tagesgeschäft und der Terminkoordination. Dabei verantwortest du die Kommunikation und Pflege aller Trainingstermine auf unserer Webseite mit Hilfe von Wordpress sowie auf unseren Social Media Portalen (Xing, LinkedIn). Auch die interne Kommunikation betreust du in unserem Intranet und entwickelst die Kommunikationsmedien im Bereich Training stetig weiter. Du begleitest das Tagesgeschäft innerhalb unseres Trainingsumfelds (Erwachsenenbildung mit Schwerpunkt in technischen und agilen Themen) und im Social Media Umfeld. Darüber hinaus unterstützt du den Vertrieb in der Angebotserstellung von Trainings für unsere Kunden. So bekommst du bei uns die Möglichkeit, den Trainingsbereich bei deinem IT-Dienstleister ganzheitlich kennenzulernen (inkl. Marketing und Vertrieb). \n \nDas bringst du mit \nDu studierst Marketing, Unternehmenskommunikation, BWL, Sozialwissenschaften oder einen ähnlichen Studiengang und bist bereits in einem fortgeschrittenen Semester \nDu bringst erste praktische Erfahrungen im Bereich Marketing oder Erwachsenenbildung mit \nIdealerweise hast du bereits mit Wordpress, Jira und/oder Confluence gearbeitet \nKunden- und zielgruppenspezifische Ansprachen fallen dir leicht \nDu arbeitest mit hoher Eigeninitiative, strukturiert und bringst eine Hands-On-Mentalität mit \nSehr gute Deutsch- und Englischkenntnisse vervollständigen dein Profil \nWarum Novatec? \nWir wollen mit dir gemeinsam den „perfect flow“ erleben! Was das für uns bedeutet? Der Moment, in dem sich alles zu einem großen Ganzen verbindet, ob im Miteinander, im Projekt oder in der Entwicklung neuer Lösungen. Wie wir das schaffen? Durch unsere unbändige Energie, jeden Tag ein bisschen besser zu werden. Dabei erkennen wir die Trends und leben Agilität vor, um unsere Kunden ganzheitlich zu betreuen. Am Ende des Tages feiern wir unsere Erfolge und gestalten gemeinsam die Novatec: zielgerichtet, zugewandt und direkt begeistert. \n \nDas klingt spannend für dich? Dann bewirb dich bei uns und werde Teil unseres „perfect flows“! \n \nWeitere Informationen \nNovatec Consulting GmbH \nBertha-Benz-Platz 1 \n70771 Leinfelden-Echterdingen \nkarriere@novatec-gmbh.de \nhttps://www.novatec-gmbh.de/karriere',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000001028',
    status: 'verified',
  },
];
