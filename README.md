# project-template (template/angular2)

[![Build Status](http://img.shields.io/travis/open-physiology/project-template/template/angular2.svg)](https://travis-ci.org/open-physiology/project-template/branches)

This is a project template used for creating new JavaScript based projects under the open-physiology organisation.

To use it for a new project, it's best to [duplicate it](https://help.github.com/articles/duplicating-a-repository), rather than just copy the files. That way, the original git history is preserved, and changes made to this template can be merged into derived projects at a later stage:

* [Create the new repository on GitHub](https://github.com/organizations/open-physiology/repositories/new)
* In a terminal, create a bare clone of this template repository:
    ```shell
    $ git clone --bare --single-branch --branch template/angular2 https://github.com/open-physiology/project-template.git
    ```
* In a terminal, create a bare clone of this template repository:
    ```shell
    $ cd project-template.git
    $ git push https://github.com/open-physiology/<new-repo>.git template/angular2:master
    ```
* You can now remove the temporary local clone:
    ```shell
    $ rm -rf project-template.git
    ```
* Make a working copy of the new repo to start working on it.
* Do a search/replace across the whole project to replace `project-template` with the name of the new repo.
* Replace the example code, example documentation and example tests with real code, real documentation and real tests.
* Run the `init-repo.js` script from the [open-physiology/open-physiology-scripts](https://github.com/open-physiology/open-physiology-scripts) to add the proper labels and milestones.
* Go to the [ZenHub Board](https://github.com/open-physiology/open-physiology#boards) and [merge the new repo](https://www.zenhub.com/blog/multi-repo-boards-have-arrived#mergingrepositories) into the board.
