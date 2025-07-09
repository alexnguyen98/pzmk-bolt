export type CUZK_CadastralParcel = {
  _declaration: {
    _attributes: {
      version: string;
      encoding: string;
    };
  };
  _comment: string;
  "cp:CadastralParcel": {
    _attributes: {
      "xmlns:base": string;
      "xmlns:xlink": string;
      "xmlns:gml": string;
      "xmlns:gmd": string;
      "xmlns:xsi": string;
      "xmlns:gn": string;
      "xmlns:cp-ext": string;
      "gml:id": string;
      "xsi:schemaLocation": string;
      "xmlns:cp": string;
    };
    "cp:areaValue": {
      _attributes: {
        uom: string;
      };
      _text: string;
    };
    "cp:beginLifespanVersion": {
      _text: string;
    };
    "cp:endLifespanVersion": {
      _attributes: {
        "xsi:nil": string;
        nilReason: string;
      };
    };
    "cp:geometry": {
      "gml:Polygon": {
        _attributes: {
          "gml:id": string;
          srsName: string;
          srsDimension: string;
        };
        "gml:exterior": {
          "gml:LinearRing": {
            "gml:posList": {
              _text: string;
            };
          };
        };
        "gml:interior":
          | {
              "gml:LinearRing": {
                "gml:posList": {
                  _text: string;
                };
              };
            }
          | {
              "gml:LinearRing": {
                "gml:posList": {
                  _text: string;
                };
              };
            }[];
      };
    };
    "cp:inspireId": {
      "base:Identifier": {
        "base:localId": {
          _text: string;
        };
        "base:namespace": {
          _text: string;
        };
      };
    };
    "cp:label": {
      _text: string;
    };
    "cp:nationalCadastralReference": {
      _text: string;
    };
    "cp:referencePoint": {
      "gml:Point": {
        _attributes: {
          "gml:id": string;
          srsName: string;
          srsDimension: string;
        };
        "gml:pos": {
          _text: string;
        };
      };
    };
    "cp:validFrom": {
      _attributes: {
        "xsi:nil": string;
        nilReason: string;
      };
    };
    "cp:administrativeUnit": {
      _attributes: {
        "xlink:type": string;
        "xlink:href": string;
        "xlink:title": string;
      };
    };
    "cp:zoning": {
      _attributes: {
        "xlink:type": string;
        "xlink:href": string;
        "xlink:title": string;
      };
    };
  };
};
