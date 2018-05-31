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
name: Anas Alsoliman
# Formal status, e.g., 'student-phd' or 'student-masters'.
# (See people.roles in ../config.yaml for the full list of roles.)
role: student-PhD
# Free-form status in your studies, e.g., 'Ph.D. Student',
# 'Ph.D. Candidate' (after candidacy),
# 'Master’s Student (co-advised Prof. Example)', etc.
status: Ph.D. Candidate
# Year when joined the group.
yearjoined: 2017
# Year of graduation. Omit if not graduated yet.
# Filename of an optional portrait photo to be featured on the page.
# The file should be put in the ../static/img/people/ directory.
portrait: aalsolim.jpg
# Filename of an optional avatar photo to be shown in the people
# directory page. Should be square. If missing, the portrait photo is
# used instead. The file should be put in the same directory as the
# portrait photo.
badge: aalsolim-badge.jpg
# A list of free-form topics constituting your main research
# interests. Keep each short and to the point; capitalize only
# the first word, and do not put a period at the end.
interests:
  - Vehicular Networks
  - Connected-Cars/Autonomous Vehicles networking applications
  - Infrastructure support of smart cities and Intelligent Transportation Systems (ITS)
# A list of acquired degrees, in reversed chronological order,
# each described by three fields: official degree title, name of
# the university, and year of graduation.
education:
  - degree: M.S. in Network Engineering and Security
    institution: DePaul University.
    year: 2014
  - degree: B.S. in Information Systems
    institution: King Saud University, Saudi Arabia.
    year: 2012
# Optional email address.
email: aalsolim@uci.edu
# Optional URL of your personal website (outside of the lab website).
# Must include the protocol part, e.g., 'http://' or 'https://'.
# Optional bibliography to feature at the bottom of the page.
# Each of the listed identifiers must match a BibTeX key of
# a publication from your BibTeX file. The corresponding publications
# appear on the page in the same order they are listed here.
#
# Publications can be grouped into arbitrary sections to your liking.
# For instance, by year:
#bibliography:
#  - title: 2017
#    items:
#    - bibtexkey1
#    - bibtexkey2
#  - title: 2016
#    items:
#    - bibtexkey3
#    - bibtexkey4
# or by kind:
#bibliography:
#  - title: Featured
#    - bibtexkey1
#    - bibtexkey2
#  - title: Journal Articles
#    items:
#    - bibtexkey3
#  - title: Conference Proceedings
#    items:
#    - bibtexkey4
#    - bibtexkey5
# or in any other way. If unsure how to categorize, use a single list
# format, as shown above; you can always revisit this decision later.
---

During my Master studies, I've got the opportunity to design data networks using real Cisco equipments at DePaul University networking lab. In my Master's final project, I have designed a comprehensive network architecture for delay-sensitive applications with dual-homed data centers. In my design, I was able to prove (by experiment in the lab) how my fault-tolerance strategies can keep the network stable even when multiple parts of the network fail at the same time. My experience at the lab gave me a good insight on how ISPs design and operate their networks.

Prior to attending UCI, I worked at STC, a major telecommunications company located in Saudi Arabia. I was assigned to the Packet-Core Network Section under Network Control & Architecture department where we (as a team) evaluate, design, and propose technical solutions to the ISP's core level of the PS network, as well as oversee all ongoing projects in the PS network.

Currently at UCI, I am investigating the communication scenarios between vehicles cruising down the road. There are different possible applications for vehicular networks, ranging from entertainment applications to collaborative driving of autonomous vehicles. Ultimately, road conditions are not always optimal for exchanging messages between speedy vehicles. For example, wireless signal fading due to high-rise buildings and congestion in the wireless spectrum would pose a great challenge on many vehicular applications, especially the safety-critical ones. Therefore, my current research focuses on evaluating and proposing possible solutions for enabling a reliable Vehicular Ad-Hoc Network (VANET). My current work include researching V2V and V2I limitations, ITS infrastructure support, message caching via Named-Data Network, and multi-path message delivery via multiple network interfaces (802.11p, WiFi, LTE/5G).
