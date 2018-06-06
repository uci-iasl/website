---
# Page front matter
#
# The text between the '---' lines at the start of this file defines
# the metadata, which is used to provide a unified profile at the top
# of the generated personal page and in the people directory page.
#
# The metadata consist of a number YAML-formatted fields, usually
# taking values of strings or string arrays. You do not need to know
# the complete YAML syntax; just format your information the same way
# it is done for the exemplary data below.
#
# Do not copy the lines starting with '#' (like this one) into your
# file; those are just comments.
#
# Full name, e.g., 'Firstname Lastname' or 'Firstname M. Lastname'.
# Write it the same way you would in a paper.
name: Full Name
# Formal status, e.g., 'student-phd' or 'student-masters'.
# (See people.roles in ../config.yaml for the full list of roles.)
role: student-phd
# Free-form status in your studies, e.g., 'Ph.D. Student',
# 'Ph.D. Candidate' (after candidacy),
# 'Master’s Student (co-advised Prof. Example)', etc.
status: Ph.D. Candidate
# Year when joined the group.
yearjoined: 2016
# Year of graduation. Omit (the whole line) if not graduated yet.
yeargraduated: 2018
# Filename of an optional portrait photo to be featured on the page.
# The file should be put in the ../static/img/people/ directory.
portrait: panteater.jpg
# Filename of an optional avatar photo to be shown in the people
# directory page. Should be square. If missing, the portrait photo is
# used instead. The file should be put in the same directory as the
# portrait photo.
badge: panteater-badge.jpg
# A list of free-form topics constituting your main research
# interests. Keep each short and to the point; capitalize only
# the first word, and do not put a period at the end.
interests:
  - Adaptive machine learning in wireless systems
  - Adversarial machine learning
  - Automatic problem generation
# A list of acquired degrees, in reversed chronological order,
# each described by three fields: official degree title, name of
# the university, and year of graduation.
education:
  - degree: M.S. in Computer Science
    institution: University of California, Irvine.
    year: 2016
  - degree: B.S. in Computer and Information Science
    institution: University of Oregon, U.S.
    year: 2014
# Optional email address.
email: panteater@uci.edu
# Optional links to your personal website (outside of the lab website)
# and other relevant places of your presence on the web. Each link
# requires a URL and allows for an optional title to be used as the
# link text. Omit the title if the URL is short and you want the
# domain name to stand out (e.g., if it is your personal domain);
# otherwise (e.g., if it is a page in a social network), please
# include a short and representative title. URLs must include the
# protocol part, e.g., 'http://' or 'https://'.
websites:
  - url: http://example.org
  - title: LinkedIn
    url: https://www.linkedin.com/in/example/
# Optional bibliography to feature at the bottom of the page.
bibliography:
  - items:
    - bibtexkey1
    - bibtexkey2
    - bibtexkey3
# Each of the listed identifiers must match a BibTeX key of
# a publication from your BibTeX file. The corresponding publications
# appear on the page in the same order they are listed here.
#
# Publications can be grouped into arbitrary sections to your liking.
# For instance, by year:
bibliography:
  - title: 2017
    items:
    - bibtexkey1
    - bibtexkey2
  - title: 2016
    items:
    - bibtexkey3
    - bibtexkey4
# or by kind:
bibliography:
  - title: Featured
    - bibtexkey1
    - bibtexkey2
  - title: Journal Articles
    items:
    - bibtexkey3
  - title: Conference Proceedings
    items:
    - bibtexkey4
    - bibtexkey5
# or in any other way. If unsure how to categorize, use a single list
# format, as shown above; you can always revisit this decision later.
---

The rest of the file is treated as a UTF-8 Markdown document.
For a short description of the supported syntax, refer to the
`text.md` example file.

Do not start this text with a title; the profile generated with the
above metadata includes your name as a title. Feel free to have
sections and subsections in the following text. Keep the first
paragraph (or two) for a short description that serves as a
continuation and more verbose expansion of the profile in the front
matter.

The rest of the text you can organize as it suits you to describe your
bio and the research you had done before you joined the group, the
research you have done since then in the group, and your plans for
future research.
