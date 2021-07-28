import { Advertisement } from './advertisement';
import faker from 'faker';

export const advertisementSeed: Array<Advertisement> = [
  {
    id: '40000000-0000-1000-8000-000000000001',
    authorId: '00000000-0000-1000-8000-000000000003',
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
    authorId: '00000000-0000-1000-8000-000000000003',
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
    authorId: '00000000-0000-1000-8000-000000000003',
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
    authorId: '00000000-0000-1000-8000-000000000003',
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
    authorId: '00000000-0000-1000-8000-000000000003',
    title: 'Kassierer(m/f/d)',
    shortDescription: 'Kassieren und Regale auffüllen',
    content:
      'Key Responsibilities\n-Development of Bokeh applications and Jupyter notebooks for monitoring of capital markets data\n-Implement and test machine learning approaches for market data quality assurance\n-Growing our methodological code base while curating the documentation\n\nQualifications\n-Currently working towards a university degree (preferably Master) in mathematics, computer science, physics or a related field\n-Programming experience using e.g. Python (ideally showcasing public projects on GitHub or Kaggle)\n-Knowledge of database technologies (SQL) and version control systems (git)\n\nExperience & Key skills\n-Strong analytical and conceptual capabilities\n-Independent and outcome-oriented working style\n\n',
    startDate: new Date('2021-07-19T14:15:29.307+00:00'),
    endDate: new Date('2021-08-20T14:15:29.307+00:00'),
    advertisementImageBlobId: '10000000-0000-1000-8000-000000000556',
    status: 'verified',
  },
];
