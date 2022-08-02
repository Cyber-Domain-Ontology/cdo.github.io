# CDO Manual

This step-by-step manual uses the example of representing embedded PDF metadata. The example and associated activities were created by Alex Nelson at NIST for the CASE Workshop on 1 August 2022. 

## 1) Does CASE represent my data?
The first step is to search the current CASE/UCO documentation to determine whether your data can already be represented.

For example, consider the following properties embedded in a PDF file:

- PDF version:    1.5
- CreationDate:   2005-05-25T02:23:55Z
- ModDate:        2005-05-25T02:23:55Z

Searching [online documentation](https://ontology.unifiedcyberontology.org/uco/documentation/entities-tree-classes.html) for string "pdf" returns observable:PDFFileFacet:

The current properties for PDFFileFacet are:

- observable:documentInformationDictionary
- observable:isOptimized	owl:DatatypeProperty	
- observable:pdfId0
- observable:pdfId1
- observable:version

From this, we can map "PDF version" to `observable:version`, but need to add new properties to represent "CreationDate" and "ModDate".

## 2) How do I translate my data into CASE/UCO?

Sample python is provided on GitHub in [CASE-Mapping-Template-Python](https://github.com/casework/CASE-Mapping-Template-Python/blob/main/case_example_mapping/dict_to_case.py).

The template can be used to create a new script `pdf_info_txt_to_case.py` that sets the context and reads PDF embedded metadata as input.

```python
    # Initialize the basic CASE graph that will have the files appended
    case: dict = {
        "@context": {
            "case-investigation": "https://ontology.caseontology.org/case/investigation/",
            "kb": "http://example.org/kb/",
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "uco-action": "https://ontology.unifiedcyberontology.org/uco/action/",
            "uco-core": "https://ontology.unifiedcyberontology.org/uco/core/",
            "uco-identity": "https://ontology.unifiedcyberontology.org/uco/identity/",
            "uco-location": "https://ontology.unifiedcyberontology.org/uco/location/",
            "uco-observable": "https://ontology.unifiedcyberontology.org/uco/observable/",
            "uco-tool": "https://ontology.unifiedcyberontology.org/uco/tool/",
            "uco-types": "https://ontology.unifiedcyberontology.org/uco/types/",
            "uco-vocabulary": "https://ontology.unifiedcyberontology.org/uco/vocabulary/",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
        },
```

For the data that already map to CASE/UCO, translate them to the corresponding property:

```python
            if input_key == "PDF version":
                pdf_file_facet["uco-observable:version"] = input_value
```

Generate the uuid for each instance of a PDF file, following the guidance on [instance data](https://caseontology.org/resources/instance_data.html)

```python
    import uuid
    pdf_file_facet = {
        "@type": "uco-observable:PDFFileFacet"
    }
    pdf_file = {
        "@id": "kb:pdf-file-" + str(uuid.uuid4()),
        "@type": "uco-observable:PDFFile",
        "uco-core:hasFacet": [pdf_file_facet]
    }
    case["@graph"].append(pdf_file)
```

Finally, write the CASE graph to a file:

```python
    import json
    with open(args.output_path, "w") as case_file:
        json.dump(case, case_file, ensure_ascii=False, indent=4)
```

Run the new script to translate the mapped PDF metadata to CASE/UCO.

```s
% python3 ./pdf_info_txt_to_case.py your_case_output.json 000015.pdf.pdfinfo-isodates.txt
```

```json
    "@graph": [
        {
            "@id": "kb:pdf-file-6832c97f-a4d9-4b5a-afa8-c7d9c54a52bd",
            "@type": "uco-observable:PDFFile",
            "uco-core:hasFacet": [
                {
                    "@type": "uco-observable:PDFFileFacet",
                    "uco-observable:version": "1.5"
                }
            ]
        }
    ]
```

## 3) How do I propose a new property in CASE/UCO?

To propose a new property, use GitHub to create an issue using the Change Proposal template:

SCREENSHOT

For example, see the [Issue 421](https://github.com/ucoProject/UCO/issues/421) change proposal to represent CreationDate and ModDate embedded in PDF files.

Once approved, these new properties can be added to the script to translate the data to CASE/UCO: 

```python
            elif input_key == "CreationDate":
                pdf_file_facet["uco-observable:pdfCreatedDate"] = {
                    "@type": "xsd:dateTime",
                    "@value": input_value
                }
            elif input_key == "ModDate":
                pdf_file_facet["uco-observable:pdfModDate"] = {
                    "@type": "xsd:dateTime",
                    "@value": input_value
                }
```

## 4) How do I verify that my CASE/UCO representation is ontologically correct?

Validation capabilities are baked into CASE/UCO using SHACL and can be perfored using the following command:

```s
% case_validate your_case_output.json
```

The validation will ignore any properties that do not have a SHACL shape defined.

Another validation step is to test whether you have generated valid graph data. This can be perfomed using `rdfpipe` to convert the JSON-LD to TTL:

```s
% rdfpipe output.json 
@prefix kb: <http://example.org/kb/> .
@prefix uco-core: <https://ontology.unifiedcyberontology.org/uco/core/> .
@prefix uco-observable: <https://ontology.unifiedcyberontology.org/uco/observable/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

kb:pdf-file-6832c97f-a4d9-4b5a-afa8-c7d9c54a52bd a uco-observable:PDFFile ;
    uco-core:hasFacet [ a uco-observable:PDFFileFacet ;
            uco-observable:pdfAuthor "U.S. Government Printing Office" ;
            uco-observable:pdfCreatedDate "2005-05-25T02:23:55+00:00"^^xsd:dateTime ;
            uco-observable:pdfModDate "2005-05-25T02:23:55+00:00"^^xsd:dateTime ;
            uco-observable:version "1.5" ] .
```

## 5) How do I test my data with a SPARQL query?


First, create a SPARQL query within a file:

```s
PREFIX drafting: <http://example.org/ontology/drafting/>
PREFIX uco-observable: <https://ontology.unifiedcyberontology.org/uco/observable/>

SELECT ?nPDFFile ?lAuthor
WHERE {
  ?nPDFFile
    a uco-observable:PDFFile ;
    uco-core:hasFacet ?nPDFFileFacet ;
    .

  ?nPDFFileFacet
    drafting:pdfAuthor ?lAuthor ;
    .
}
```

Then run a SPARQL query using `case_sparql_select`:

```s
% case_sparql_select out.md query.sparql input.json
|    | ?nPDFFile                                                           | ?lAuthor                        |
|----|---------------------------------------------------------------------|---------------------------------|
|  0 | http://example.org/kb/pdf-file-6832c97f-a4d9-4b5a-afa8-c7d9c54a52bd | U.S. Government Printing Office |
```
