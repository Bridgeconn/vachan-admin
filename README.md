# vachan-admin

A tool for adminstration of the Vachan API

## Features

- Add Bible Sources
- Bulk upload source usfm files to a bible source
- Add Commentary
- Add Dictionary
- Add Infographics
- Add Videos
- Add Audio Bible
- Add Metadata
- Add Bible Book Names
- Logs
- Add/View/Remove configuration
- Command Line Interface (CLI)

## Installation

- You need to install [NodeJS](https://nodejs.org/en/)
- Clone this github repository using `git clone <github-url>`
- Run `npm install -g .` from the main project folder which contains the package.json file

## Usage

### Initial Configuration

Run `vachan-config login <vachan-engin-url> <admin-email> <admin-pass>` to configure the tool

Once the tool is configure it can be used to add any of the supported source types

Run `vachan-admin -h` to see how to use the tool

```
> vachan-admin -h
Usage: vachan-admin <command> [options]

Commands:
  vachan-admin add  Add given content to vachan-engine

Options:
  -t, --type      Specify the type of source to add
        [required] [choices: "biblesource", "bible", "commentary", "dictionary",
                   "infographic", "audiobible", "video", "bookname", "metadata"]
  -f, --file      Specify the file or folder to get data from         [required]
  -m, --metadata  Specify the metadata file for source
  -h, --help      Show help                                            [boolean]
  -v, --version   Show version number                                  [boolean]

Examples:
  vachan-admin add -t bible -f hin  #adds a bible
```

### Add Sources

##### 1) Add Bible Sources

- Make a csv file with the headers [year,license,languageCode,versionContentCode,versionContentDescription,revision] eg. bibles.csv
- Add the bible version data for each bible to add eg. [2018,Public Domain,eng,KJV,King James Version,1]
- Run `vachan-admin add -t biblesource -f <path>/bible.csv` to add the bible source

##### 2) Upload Bible Usfm Source for a bible

- Put all the usfm files to be uploaded into a folder (Note: files should be .usfm or .sfm)
- Run `vachan-admin add -t bible -f <folder-path>`
- Select the language and version to upload it to and confirm with 'y'
- All the bibles usfm files will be processed and uploaded and the Summary Output shown,

##### 3) Add Bible Book Names in native languages

- Make a csv file with the headers [abbr,short,long,bookCode,language] eg.bibleBookNames.csv
- Put all the bible books names in the csv file eg. [gen,Genesis,Genesis,gen,eng]
- Run `vachan-admin add -t bookname -f <path>/bibleBookNames.csv` to add the bible book names

### View Logs

In case of any errors the logs can be found in the vachan-admin.log file in the main project folder

### Configuration

- To view the vachan-engine config run `vachan-config login`
- To add/overwrite the vachan-engine config run `vachan-config login <vachan-engin-url> <admin-email> <admin-pass>`
- To remove the vachan-engine config run `vachan-config logout`
- To uninstall the tool scripts run `npm uninstall -g vachan-admin` and `npm uninstall -g vachan-config`
