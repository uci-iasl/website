The following shows how to add a paper published with the IASL group. Find the guide relative to external papers (either before, during or after the permanence in the group) furhter down the page.

In order to add a new paper to an existing profile, you will need to:
* clone the repository on your local machine
* create a new branch (convention is people-USERANAME_new_paper)
* add bibtex to static/iasl.bib (convention for the name is ONE-TWO-year-venue) where ONE=first author's last name, TWO=second author's last name.
* run (from website directory): scripts/mkbibdata
* Cite the reference name in the pages of all coauthors (content/people/NICK_NAME.md) and content/publications/_index.md
* Add the submitted pdf (no copyright footnote!!) to static/pub with name ONE-TWO-year-venue.pdf