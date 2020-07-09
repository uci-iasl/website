---
name:
  first: First Names
  middle: Middle Names  # Remove if unnecessary.
  last: Last Name
  lineage: Lineage Suffix  # Remove if unnecessary.
role: student-phd
status: Ph.D. Candidate
yearjoined: {{ dateFormat "2006" .Date }}
portrait: {{ .TranslationBaseName }}.jpg
badge: {{ .TranslationBaseName }}-badge.jpg
interests:
- Wireless networks
- Machine learning
- Stochastic optimization
education:
- degree: M.S. in Computer Science
  institution: University of California, Irvine.
  year: {{ dateFormat "2006" .Date }}
- degree: B.S. in Computer Science
  institution: University of California, Irvine.
  year: {{ dateFormat "2006" (now.AddDate -2 0 0) }}
email: {{ .TranslationBaseName }}@uci.edu
websites:
- url: http://example.org
- title: LinkedIn
  url: https://www.linkedin.com/in/example/
bibliography:
- title: {{ dateFormat "2006" .Date }}
  items:
  - bibtexkey1
  - bibtexkey2
- title: {{ dateFormat "2006" (now.AddDate -1 0 0) }}
  items:
  - bibtexkey3
  - bibtexkey4
---

Bio.

Expanded research interests.
