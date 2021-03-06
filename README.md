# UCI Intelligent and Autonomous Systems Lab Website

This is the repository for the source code behind the website at
[iasl.ics.uci.edu][iasl].
Built using the [Hugo][hugo] static website generator.

[iasl]: https://iasl.ics.uci.edu
[hugo]: https://gohugo.io


## Building

In order to build the website, it is necessary to have a recent Hugo
binary installed.
Currently, the minimal required version is 0.62.
Whenever possible, however, it is recommended to install the latest
version.

For different methods of installation available on your platform,
see the [Install Hugo][hugo-install] page
in the [Get Started][hugo-getstarted] section
on the [Hugo][hugo] website.
If you cannot use your platform’s package manager to install Hugo
(e.g., due to the lack of permissions), or if the version available in
the package is older than the minimal required one (as it is often the
case with, e.g., Debian-based Linux distributions), you will have to
install Hugo manually.

Luckily, it is easy to do, as Hugo does not require installation per se:
All you need is to have a copy of its binary available somewhere on
the machine.
The easiest way to obtain it is to use our own
[`gethugo` script][iasl-gethugo].
Just run it from any directory you have permissions to write in, and
it will download the binary from the [latest release][hugo-releases-latest]
of Hugo to that directory.
Then, use that binary as usual; there is no need to put it in any
specific directory—Hugo does not have any dependencies and runs
fine from anywhere.

Of course, you can also manually download the same binary (or any
of its previous versions) for any of the supported platforms from
the [Hugo Releases][hugo-releases] page on GitHub.

To build the website, just run the Hugo binary without any arguments
from the root directory of the repository:

    $ hugo

(Do not forget to specify the full path to the `hugo` binary, if you are
using one installed manually outside of the directories listed in your
`$PATH` environment variable.)

The generated website pages ready to be served will be put under
the `public` subdirectory, by default.

For the exact list of command-line options used to invoke Hugo
for building the release version of the website during deployment,
see the [`fetchsite` script][iasl-fetchsite].
For the help on using the `hugo` command in general, refer to the
[corresponding page][hugo-command] in Hugo documentation.

[hugo-install]: https://gohugo.io/getting-started/installing
[hugo-getstarted]: https://gohugo.io/getting-started/
[hugo-command]: https://gohugo.io/commands/hugo/
[hugo-releases]: https://github.com/gohugoio/hugo/releases
[hugo-releases-latest]: https://github.com/gohugoio/hugo/releases/latest
[iasl-gethugo]: https://github.com/uci-iasl/website/blob/release/scripts/gethugo
[iasl-fetchsite]: https://github.com/uci-iasl/website/blob/release/scripts/fetchsite


## Contributing

Contributions are accepted from the current and past full-time members
of the lab.

If you have not contributed to the website source directly before,
email your GitHub username to one of the repository maintainers listed
below, so you can be made a member.

- Davide Callegaro
- Igor Burago

### Workflow

The `release` branch is reserved to always represent the current state
of the website as [publicly hosted][iasl].
Committing or pushing directly to `release` is prohibited.

When working on a change, create a separate branch based on the
`draft` branch, make one or more commits constituting the change and
then create a pull request for merging your branch back into `draft`.
You can also use another branch based on `draft` as a starting point
(useful when collaborating on different chunks of a single big
change, e.g., a new project page).
Each pull request should roughly correspond to a single logical
change, regardless of the amount of code it affects.

The maintainers make sure that the proposed changes do not break
the build, look good technically, and follow the website guidelines,
before merging them into `draft`, where they are subject to discussion
and proposals of further edits.
The code in `draft` should always compile to a working website without
errors.
From there, whenever ready, the changes are merged into `release` for
deployment.

### Content

The main kinds of pages maintained within the website are:

- personal pages,
- project pages,
- the Publications page.

#### Personal Pages

The content of a personal page is populated from the following files.

1. A Markdown file `content/people/‹id›.md` formatted after the
[`example/people.md`][personal-template] template, containing personal
profile, such as education, research interests, publications, as well
as any other information in a free form that is to constitute the
personal page.

2. A portrait photo `static/img/people/‹id›.jpg` that is *taller than
wider*, preferably of 400px wide or more.
Optionally, you can also provide a *square* photo
`static/img/people/‹id›-badge.jpg`, preferably of 200px wide or more.
The former will be featured on your personal page itself, the latter
(if present) will be used instead of the former on the People page.
See [`example/people.md`][personal-template] on how to bind
those image files to the personal profile via the front-matter
metadata of the personal page.

3. BibTeX files in the `static/bib` listing the publications available
for referencing in bibliographies across the website.
Publications you have (co)authored within the lab and under Prof.
Levorato’s supervision must go to the `static/bib/iasl.bib` file, and
should be included into the lab-wide bibliography on the Publications
page, which is defined by the `content/publications/_index.md` file.
Publications you have done in the past or since joining the lab but
outside of it and not under Prof. Levorato’s supervision, must go to
the `static/bib/‹id›.bib` file, and should be included into
bibliographies on your personal page or relevant project pages.

In the above filenames, `‹id›` stands for your personal page id.
The id is used as a part of the URL of your personal page on the
website, e.g., `https://iasl.ics.uci.edu/people/panteater/`.
A good default for the id is your UCI email address without the
`@uci.edu` domain part, but, if you do not like that to be your id,
you can use a different one of your liking.
For the sake of consistency, please prefer an all-lowercase id in
the form of `flast`, `fmlast`, `last`, `firstlast`, or `firstmlast`, where
`first` and `last` stand for your first and last names, respectively,
and `f` and `m` stand for the first letters of your first and middle
names, respectively.
If none of that works for you, something else is fine, too, but please
keep it more or less formal and do not make it too short or too long.

[personal-template]: https://raw.githubusercontent.com/uci-iasl/website/release/example/people.md

#### Project Pages

The content of a project page is populated from the following files.

1. A Markdown file `content/projects/‹project-id›.md` formatted
after the [`example/projects.md`][project-template] template.

2. A cover image `static/img/projects/‹project-id›/‹image-name›.png`
that represents the project idea the best and captures the attention.
The name of this image (`‹image-name›.png`) should be specified
in the front-matter metadata of the project’s Markdown page
(see [`example/projects.md`][project-template]).

3. Image files for any other illustrations included in the body of the
project page.
All of them should also be put into the
`static/img/projects/‹project-id›` directory.
The preferred image formats are JPEG, PNG, and SVG, which are to be
used for photos, raster images that are not photos, and vector
graphics, respectively.

In the above paths, `‹project-id›` stands for the URL-style name of
the project that is preferably short and consists of lowercase
letters, digits, and hyphens, e.g., `autonomous-uav-iot` or
`edge-sensing-ehealth`.

[project-template]: https://raw.githubusercontent.com/uci-iasl/website/release/example/projects.md

### Preview While Editing

If you [have Hugo installed](#building), you can preview the pages
you are editing in browser.
For that, you can run

    $ hugo server

in the command line from the root directory of the repository, and
keep the `http://localhost:1313/` page open in browser.
Whenever any of the files are changed, the website is automatically
rebuilt and updated in that browser window.

To see the changes in bibliography information reflected on the
generated pages, first install the following Python packages:

    $ pip3 install -r scripts/requirements.txt

and then run the command

    $ scripts/mkbibdata

from the root directory whenever BibTeX files in the `static/bib`
directory are modified.
