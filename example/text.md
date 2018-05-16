The default format for writing the body text of all pages published on
the website is Markdown. If the text contains non-ASCII characters, it
is required to be encoded in UTF-8.

<!--more-->

Any text before the '<!--more-->' line is treated as a summary they
may be used in various rubric pages referring to this page, within
which itself, of course, both the text above and below that line is
included. Personal pages in the People section of the website, do
not use summaries.

For a quick reference of the Markdown syntax, see [its creator page][mdsyn].

[mdsyn]: https://daringfireball.net/projects/markdown/syntax

In addition to the standard Markdown syntax, our website supports
citing the papers in your bibliography using the following syntax:

    {{< cite "bibtexkey1" "bibtexkey2" "bibtexkey3" >}}

Think of it as the `\cite{bibtexkey1,bibtexkey2,bibtexkey3}` LaTeX
command. It generates the links to the corresponding papers in
your bibliography, made out of author’s names in square brackets.
