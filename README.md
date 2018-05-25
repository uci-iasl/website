# UCI Intelligent and Autonomous Systems Lab Website

The master repository for the source code behind the website at
[iasl.ics.uci.edu][iasl].
Built using the [Hugo][hugo] static website generator.

[iasl]: https://iasl.ics.uci.edu
[hugo]: https://gohugo.io

## Contributing

Contributions are accepted from the current and past full-time members
of the lab.

If you have not contributed to the website source directly before,
email your GitHub username to one of the repository maintainers listed
below, so you can be made a member.

- Davide Callegaro
- Igor Burago

### Workflow

The `master` branch is reserved to always represent the current state
of the website as deployed at the [lab address][iasl].
Committing or pushing directly to `master` is prohibited.

When working on a change, create a separate branch based on the
`draft` branch (also the default one), make one or more commits
constituting the change and then create a pull request for merging
your branch back into `draft`.
You can also use another branch based on `draft` as a starting point
(useful when collaborating on different chunks of a single big
change).
Each pull request should roughly correspond to a single logical
change.

The maintainers make sure that the proposed changes look good
technically and do not break the build, then merge them into `draft`,
where they are subject to review, discussion, and proposals of further
edits.
From there, whenever ready, the changes are merged into `master`
for deployment.

### Content

The main kinds of pages maintained within the website are:

- Personal pages,
- Project pages,
- Publications page.

#### Personal Pages

To populate personal pages and the joint bibliography,
we need to receive the following content from you.

1. A Markdown file `content/people/‹id›.md` formatted after the
[`example/people.md`][personal-template] template, containing a solid
draft of your personal page.

2. A portrait photo `static/img/people/‹id›.jpg` that is *taller than
wider*, preferably of 400px wide or more.
Optionally, you can also provide a *square* photo
`static/img/people/‹id›-badge.jpg`, preferably of 200px wide or more.
The former will be featured on your personal page itself, the latter
(if present) will be used instead of the former on the People page.
(See also [`example/people.md`][personal-template].)

3. A BibTeX file `bib/‹id›.bib` listing all the publications you have
(co)authored within the lab and under Prof. Levorato’s supervision.
The items in this file will be used to populate the lab-wide
bibliography shown in the Publications page.

4. A BibTeX file named `bib/‹id›-other.bib` listing the publications you
have done in the past or since joining the lab but outside of it and
not under Prof. Levorato’s supervision.
Only the items you want to show off on your personal page or cite from
relevant project pages, are necessary; these will not go to the
lab-wide bibliography.

In the above filenames, replace `‹id›` with your UCI email address
without the `@uci.edu` domain part.

#### Project Pages

Each project should be described in a separate Markdown file located
in the `content/projects` directory, and formatted after the
[`example/projects.md`][project-template] template.

[personal-template]: https://raw.githubusercontent.com/uci-iasl/website/master/example/people.md
[project-template]: https://raw.githubusercontent.com/uci-iasl/website/master/example/projects.md

### Preview While Editing

If you have [Hugo][hugo] installed, you can preview the pages you
are editing in browser.
For that, you can periodically run

    hugo

in the command line from the root directory of the repository for the
your changes to be reflected in the built website, which you can view
by opening the `public/index.html` file in browser.

Alternatively, you can run the command

    hugo server

once (also from the root directory), and keep the page
`http://localhost:1313/` page open in browser.
In that case, whenever any of the files is changed, the website is
automatically rebuilt and updated in that browser window.

To make the automatically generated bibliographies work, install
the Python `pybtex` package:

    pip install pybtex

and then run the command

    scripts/mkbib

from the root directory after you add or update BibTeX files in the
`bib` subdirectory.
