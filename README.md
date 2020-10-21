# vachan-admin

A tool for adminstration of the Vachan Engine

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
- Clone [this](https://github.com/Bridgeconn/vachan-admin.git) github repository using `git clone https://github.com/Bridgeconn/vachan-admin.git`
- Run `npm install -g .` from the main project folder which contains the package.json file

## Usage

### Initial Configuration

This tool is meant for admin user of [vachan-api](https://github.com/Bridgeconn/vachan-api.git)
You need to have the Vachan Engine server running and have the sd admin credentials for the Vachan Engine server

#### To configure the tool

Run `vachan-config login <vachan-engin-url> <admin-email> <admin-pass>`
Eg. `vachan-config login -c http://vachanengine.com/v1 sdadmin@gmail.com password`

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

#### 1) Add Bible Sources

- Make a csv file with the headers [year,license,languageCode,versionContentCode,versionContentDescription,revision] eg. bibles.csv
- Add the bible version data for each bible to add eg. [2018,Public Domain,eng,KJV,King James Version,1]
- Run `vachan-admin add -t biblesource -f <path>/bible.csv` to add the bible source

#### 2) Upload Bible Usfm Source for a bible

- Put all the usfm files to be uploaded into a folder (Note: files should have the extension .usfm or .sfm)
- Run `vachan-admin add -t bible -f <folder-path>`
- Select the language and version to upload it to and confirm with 'y'
- All the bibles usfm files will be processed and uploaded and the Summary Output shown,

#### 3) Add Commentary

- Make a csv file with the headers [bookId,chapter,verse,commentary] eg. commentary.csv
- Add the Commentary data in BCV format eg. [1,1,1,<Commentary for Genesis 1 verse 1>] (Export this data from the old db table)
- Make a csv file with the headers [name,abbreviation,revision,license,year,language] eg. meta_commentary.csv
- Add the metadata for the commentary eg. [Mathew Henry Concise Commentary,MHCC,1,Public Domain,1778,eng]
- Run `vachan-admin add -t commentary -f <path>/commentary.csv -m <path>/meta_commentary.csv` to add the commentary
- Do this for each commentary you want to add

#### 4) Add Dictionary

- Make a csv file with the headers [keyword,wordForms,strongs,definition,translationHelp,seeAlso,ref,examples] eg. dictionary.csv
- Add rows for each dictionary word as per the headers (Export this data from the old db table)
- Make a csv file with the headers [name,abbreviation,revision,license,year,language] eg. meta_dictionary.csv
- Add the metadata for the dictionary eg. [Hindi IRV Dictionary,IRVd,1,CC BY SA,2019,hin]
- Run `vachan-admin add -t dictionary -f <path>/dictionary.csv -m <path>/meta_dictionary.csv` to add the dictionary
- Do this for each dictionary you want to add

#### 5) Add Infographics

- Make a csv file with the headers [bookId,title,fileName] eg. infographic.csv
- Add rows for each infographic as per the headers
- Export this data from the old db table Eg. \copy (select book_id,title,file_name from hin_infographic) To '<path>/hin_infographics.csv' with CSV DELIMITER ',' HEADER;
- Make a csv file with the headers [name,abbreviation,revision,license,year,url,language] eg. meta_infographic.csv
- Add the metadata for the infographic eg. [Hindi Infographics,HI,1,CC BY SA,2019,<url to infographic image files>,hin]
- Run `vachan-admin add -t infographic -f <path>/infographic.csv -m <path>/meta_infographic.csv` to add the infographic
- Do this for each language infographic set you want to add

#### 6) Add Audio bibles

- Make a csv file with the headers [sourceId,name,url,books,format] eg. audiobibles.csv
- Add rows for each audio bible as per the headers (Export this data from the old db table)
- Run `vachan-admin add -t audiobible -f <path>/audiobibles.csv` to add the audio bibles
- For each audio bible choose the bible to associate it with from the list shown and confirm with 'y'

#### 7) Add Videos

- Make a csv file with the headers [language,books,url,title,description,theme] eg. videos.csv
- Add rows for each video as per the headers eg [eng,jud,<video url>,<title>,<vide_description>,<theme>]
- Export this data from the old db table. Eg.\copy (select language_name as language, books,url,title,description,theme from bible_videos b inner join languages l on b.language_id = l.language_id) To <path>/videos.csv with CSV DELIMITER ',' HEADER;
- Run `vachan-admin add -t video -f <path>/videos.csv` to add the videos

#### 8) Add Bible Book Names in native languages

- Make a csv file with the headers [abbr,short,long,bookCode,language] eg.bibleBookNames.csv
- Put all the bible books names in the csv file eg. [gen,Genesis,Genesis,gen,eng]
- Export tihs data from the old db table. Eg. \copy (select abbr,short,long,book_code,language_code as language from bible_book_names b inner join bible_books_look_up bb on b.book_id = bb.book_id inner join languages l on b.language_id=l.language_id) To <path>/bibleBookNames.csv with CSV DELIMITER ',' HEADER;
- Run `vachan-admin add -t bookname -f <path>/bibleBookNames.csv` to add the bible book names

#### 9) Add Metadata to a source

- Make a csv file with the headers [language,versionCode,revision,metadata] eg. metadata.csv
- Add rows for each source metadata as per the headers (Export this data from the old db table)
- Run `vachan-admin add -t metadata -f <path>/metadata.csv` to add the metadata
- For each metadata in the csv file choose the bible to associate it with from the list shown and confirm with 'y'

### View Logs

In case of any errors the logs can be found in the vachan-admin.log file in the main project folder. If this file is auto generated and shows the final output and the errors encountered. For Bible uploads it shows a summary report of the final list of usfm files parserd and uploaded.

### Configuration

- To view the vachan-engine configuration run `vachan-config login`
- To add/overwrite the vachan-engine configuration run `vachan-config login <vachan-engin-url> <admin-email> <admin-pass>`
- To remove the vachan-engine configuration run `vachan-config logout`

### Uninstallation

To uninstall the tool run `npm uninstall -g vachan-admin`
