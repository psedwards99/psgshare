// Constants
var VALUE_UNDEFINED = 'undefined';

// Attributes
var ATTRIBUTE_SEARCH_TYPE = '@searchType';
var ATTRIBUTE_ID = '@id';
var ATTRIBUTE_HORIZONTAL_OR_SEPARATOR = '@horizontalOrSeparator';
var ATTRIBUTE_VERTICAL_OR_SEPARATOR = '@verticalOrSeparator';
var ATTRIBUTE_RESULTING_FORM_ID = '@resultingFormId';

var ATTRIBUTE_NAME = '@name';
var ATTRIBUTE_NAME_ID = '@nameId';

var ATTRIBUTE_NAME_FROM = '@nameFrom';
var ATTRIBUTE_NAME_FROM_ID = '@nameFromId';

var ATTRIBUTE_NAME_TO = '@nameTo';
var ATTRIBUTE_NAME_TO_ID = '@nameToId';

var ATTRIBUTE_LABEL = '@label';
var ATTRIBUTE_LABEL_ID = '@labelId';

var ATTRIBUTE_DESCRIPTION = '@description';
var ATTRIBUTE_DESCRIPTION_ID = '@descriptionId';

var ATTRIBUTE_SHOW = '@show';

var ATTRIBUTE_SUBMIT = '@submit';

var ATTRIBUTE_FORMAT = '@format';
var ATTRIBUTE_SORTABLE = '@sortable';

var ATTRIBUTE_NEXT_SEARCH_STAGE = '@nextSearchStage';

var ATTRIBUTE_SUBMIT_VALUE = '@submitValue';

var ATTRIBUTE_URL = '@url';

var ATTRIBUTE_URL_ID = '@urlId';
var ATRIBUTE_URL_TYPE = '@urlType';

var ATTRIBUTE_FIELD_POSITION = '@fieldPosition';
var ATTRIBUTE_FIELD_TYPE = '@fieldType';

var ATTRIBUTE_RESPONSE_ID_FIELD = '@responseIdField';
var ATTRIBUTE_RESPONSE_LABEL_FIELD = '@responseLabelField';
var ATTRIBUTE_FILL_AFTER = '@fillAfter';

var ATTRIBUTE_HIDE_FIELD = '@hideField';
var ATTRIBUTE_FILL_UNIQUE = '@fillUnique';
var ATTRIBUTE_FILL_FIELD_NAME = '@fillFieldName';
var ATTRIBUTE_FILL_FIELD_VALUE = '@fillFieldValue';

// Search types
var SEARCH_TYPE_NO_SEARCH_STAGE = 'noSearchStage';
var SEARCH_TYPE_ONE_SEARCH_STAGE = 'oneSearchStage';
var SEARCH_TYPE_TWO_SEARCH_STAGE = 'twoSearchStage';

// Field positions
var FIELD_POSITION_UP_LEFT = 'upLeft';
var FIELD_POSITION_UP_RIGHT = 'upRight';
var FIELD_POSITION_DOWN_LEFT = 'downLeft';

// Field types
var FIELD_TYPE_TEXT = 'text';
var FIELD_TYPE_INT = 'int';
var FIELD_TYPE_DATERANGE = 'daterange';
var FIELD_TYPE_DATE = 'date';
var FIELD_TYPE_SELECT = 'select';
var FIELD_TYPE_BOOLEAN = 'boolean';
var FIELD_TYPE_FLOAT = 'float';

// Response property types
var RESPONSE_TEXT = 'text';
var RESPONSE_NUMBER = 'number';
var RESPONSE_DATE = 'date';

// URL types property
var URL_TYPE_SINGLE_PARAMETER = "singleParameter";
var URL_TYPE_JSON_OBJECT = "jsonObject";
var URL_TYPE_MULTIPLE_PARAMETERS = "multipleParameters";

/**
 * Modify object obj by setting 'valid' attribute to false and adds all messages from 'messages' array into an
 * errorMessages attribute.
 * 
 * @param obj
 *            Object to modify
 * @param messages
 *            array of messages related to an error
 * @returns A obj object with 'valid' attribute set to false and appropriate 'errorMessages' array.
 */
function setErrorOnObject(obj, messages) {

	obj.valid = false;

	if (obj.errorMessages === null) {
		obj.errorMessages = messages;
	} else {
		obj.errorMessages = obj.errorMessages.concat(messages);
	}
	return obj;
}

/**
 * Converts provided XML attribute value to string if possible, otherwise null is returned.
 * 
 * @param attribute
 *            XML attribute value
 * @returns String value of an attribute if exist, otherwise null.
 */
function getStringAttributeValueEmptyAllowed(attribute) {
	// if attribute does not exist, return null
	if (typeof attribute === VALUE_UNDEFINED || attribute === null) {
		return null;
	}

	if (attribute == '') {
		return '';
	}

	attribute = attribute.toString();

	// convert attribute to native string

	// return native string value (or null if empty)
	return attribute ? attribute : null;
}

/**
 * Converts provided XML attribute value to string if possible, otherwise null is returned.
 * 
 * @param attribute
 *            XML attribute value
 * @returns String value of an attribute if exist, otherwise null.
 */
function getStringAttributeValue(attribute) {
	// if attribute does not exist, return null
	if (typeof attribute === VALUE_UNDEFINED || attribute === null) {
		return null;
	}

	// convert attribute to native string
	attribute = attribute.toString();

	// return native string value (or null if empty)
	return attribute ? attribute : null;
}

/**
 * Function obtains attribute value from passed in XML object. Method first look for attribute value based on
 * attributeName. If it is not found, attributeIdName will be obtained and appropriate message for that ID will be
 * returned.
 * 
 * @param xml
 *            XML representation of a object
 * @returns Attribute value based on attributeName or attributeIdName.
 */
function getAttributeValue(xml, attributeName, attributeIdName) {
	// if XML does not exist, return null
	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	var value = getStringAttributeValue(xml[attributeName]);
	if (value == null) {
		value = getStringAttributeValue(xml[attributeIdName]);
		if (value != null) {
			// getting appropriate value for attribute based on attributeIdName
			value = msg.get(value);
		}
	}
	return value;
}

/**
 * Function receives string true/false flag that tells that field should be submitted or not.
 * 
 * @param submitFlag
 *            string representation of a request property 'submit' true/false flag
 * @returns In case that submitFlag is equal to 'false' false will be returned, otherwise true.
 */
function getSubmitFlag(submitFlag) {
	return getStringAttributeValue(submitFlag) !== 'false';
}

/**
 * Function receives string true/false flag that tells that select field should be shown or not. 
 * 
 * @param hiddenFlag
 *            string representation of a request property 'hideField' true/false flag
 * @returns In case that hiddenFlag is equal to 'true' true will be returned, otherwise false.
 */
function getSelectHiddenFlag(hiddenFlag) {
	return getStringAttributeValue(hiddenFlag) === 'true';
}

/**
 * Function receives string true/false flag that tells that field should be uniquely populated on the form or not.
 * 
 * @param fillUniqueFlag
 *            string representation of a request property 'fillUnique' true/false flag
 * @returns In case that fillUniqueFlag is equal to 'true' true will be returned, otherwise false.
 */
function getFillUniqueFlag(fillUniqueFlag) {
	return getStringAttributeValue(fillUniqueFlag) === 'true';
}

/**
 * Function receives string true/false flag that tells should response property be shown as column in search result
 * table or not.
 * 
 * @param showFlag
 *            string representation of a request property 'show' true/false flag
 * @returns In case that showFlag is equal to 'false' false will be returned, otherwise true.
 */
function getShowFlag(showFlag) {
	return getStringAttributeValue(showFlag) !== 'false';
}

/**
 * Function receives string true/false flag that tells should response property be sortable column or not.
 * 
 * @param showFlag
 *            string representation of a request property 'sortable' true/false flag
 * @returns In case that sortableFlag is equal to 'true' true will be returned, otherwise false.
 */
function getSortableFlag(sortableFlag) {
	return getStringAttributeValue(sortableFlag) === 'true';
}

/**
 * Function receives string true/false flag that tells should 'OR' separator be rendered or not and return true or false
 * based on that value.
 * 
 * @param orSeparatorFlag
 *            string representation of a 'OR' separator true/false flag
 * @returns In case that orSeparatorFlag is equal to 'false' false will be returned, otherwise true.
 */
function getOrSeparatorFlag(orSeparatorFlag) {
	return getStringAttributeValue(orSeparatorFlag) !== 'false';
}

/**
 * Function receives field format as string value and returns appropriate format based on that string.
 * 
 * @param formatString
 *            string representation of a field format
 * @returns In case that typeString is RESPONSE_NUMBER, RESPONSE_DATE that value will be returned, otherwise
 *          RESPONSE_TEXT.
 */
function getFormat(formatString) {

	var format = getStringAttributeValue(formatString);

	if (format === RESPONSE_NUMBER || format === RESPONSE_DATE) {
		return format;
	} else {
		return RESPONSE_TEXT;
	}
}

/**
 * Function receives field position as string value and returns appropriate type based on that string.
 * 
 * @param typeString
 *            string representation of a field position
 * @returns In case that positionString is FIELD_POSITION_UP_RIGHT or FIELD_POSITION_DOWN_LEFT that value will be
 *          returned, otherwise FIELD_POSITION_UP_LEFT will be returned.
 */
function getFieldPosition(positionString) {

	var position = getStringAttributeValue(positionString);

	if (position === FIELD_POSITION_UP_RIGHT || position === FIELD_POSITION_DOWN_LEFT) {
		return position;
	} else {
		return FIELD_POSITION_UP_LEFT;
	}
}

/**
 * Function receives property type as string value and returns appropriate type based on that string.
 * 
 * @param typeString
 *            string representation of a property type
 * @returns In case that typeString is FIELD_TYPE_INT, FIELD_TYPE_SELECT, FIELD_TYPE_BOOLEAN, FIELD_TYPE_FLOAT,
 *          FIELD_TYPE_DATE or FIELD_TYPE_DATERANGE that value will be returned, otherwise FIELD_TYPE_TEXT.
 */
function getFieldType(typeString) {

	var type = getStringAttributeValue(typeString);

	if (type === FIELD_TYPE_INT || type === FIELD_TYPE_SELECT || type === FIELD_TYPE_DATERANGE || type === FIELD_TYPE_BOOLEAN
			|| type === FIELD_TYPE_FLOAT || type === FIELD_TYPE_DATE) {
		return type;
	} else {
		return FIELD_TYPE_TEXT;
	}
}

/**
 * Function receives search type as string value and returns appropriate type based on that string.
 * 
 * @param typeString
 *            string representation of a search type
 * @returns In case that searchType is SEARCH_TYPE_ONE_SEARCH_STAGE or SEARCH_TYPE_TWO_SEARCH_STAGE that value will be
 *          returned, otherwise SEARCH_TYPE_NO_SEARCH_STAGE will be returned.
 */
function getSearchType(searchType) {

	var searchTypeString = getStringAttributeValue(searchType);

	if (searchTypeString === SEARCH_TYPE_ONE_SEARCH_STAGE || searchTypeString === SEARCH_TYPE_TWO_SEARCH_STAGE) {
		return searchTypeString;
	} else {
		return SEARCH_TYPE_NO_SEARCH_STAGE;
	}
}

/**
 * Function receives url type as string value and checks it is valid. Allowed values are: URL_TYPE_JSON_OBJECT,
 * URL_TYPE_SINGLE_PARAMETER and URL_TYPE_MULTIPLE_PARAMETERS. URL_TYPE_JSON_OBJECT should contains only REST endpoint
 * URL without any additional parameters. URL_TYPE_SINGLE_PARAMETER and URL_TYPE_MULTIPLE_PARAMETERS should contains
 * REST endpoint URL with one parameter without value (ends with '=' sign).
 * 
 * @param urlType
 *            string representation of a url type
 * @param element
 *            Element JSON representation
 * @param searchIndex
 *            position of a search element
 * @param elementName
 *            name of the search element with url attribute
 * @returns In case that urlType is not valid, error will be set on the object and object will be returned.
 */
function setUrlType(urlType, element, searchIndex, elementName) {

	if (typeof urlType === VALUE_UNDEFINED || urlType === null) {
		var message = elementName + ' element of search at position ' + searchIndex + ' does not have \'urlType\' attribute. ';
		return setErrorOnObject(element, [message]);
	}

	if (urlType !== URL_TYPE_JSON_OBJECT && urlType !== URL_TYPE_SINGLE_PARAMETER && urlType !== URL_TYPE_MULTIPLE_PARAMETERS) {
		var message = elementName + ' element of search at position ' + searchIndex
				+ ' has unallowed \'urlType\' attribute value. Allowed values are: ' + URL_TYPE_JSON_OBJECT + ', '
				+ URL_TYPE_SINGLE_PARAMETER + ' or ' + URL_TYPE_MULTIPLE_PARAMETERS + '. ';
		return setErrorOnObject(element, [message]);
	}

	if (urlType === URL_TYPE_MULTIPLE_PARAMETERS && (/\?|=/.test(element.url))) {
		var message = elementName + ' element of search at position ' + searchIndex
				+ ' has unallowed \'url\' attribute value for \'urlType\' attribute (\'' + urlType
				+ '\'). URL should not contain \'?\' or \'=\' character. ';
		return setErrorOnObject(element, [message]);
	}

	if ((urlType === URL_TYPE_SINGLE_PARAMETER || urlType === URL_TYPE_JSON_OBJECT) && !(/\?[^&?]*=/.test(element.url))) {
		var message = elementName + ' element of search at position ' + searchIndex
				+ ' has unallowed \'url\' attribute value for \'urlType\' (\'' + urlType
				+ '\'). URL should end with \'?{paramName}=\' string. ';
		return setErrorOnObject(element, [message]);
	}
	element.urlType = urlType;
}

/**
 * Parses XML representation of select option.
 * 
 * @param xml
 *            XML representation of select option.
 * @param searchIndex
 *            position of a search element
 * @param fieldIndex
 *            position of a field in the form element
 * @param optionPosition
 *            position of an object element in the field element
 * @returns Select option object.
 */
function parseSelectOption(xml, searchIndex, fieldIndex, optionPosition) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	var selectOption = {
		valid : true,
		errorMessages : []
	};

	// if option ID attribute does not exist and option is not first in the list
	// error with appropriate message is set on a field option object
	selectOption.id = (getStringAttributeValueEmptyAllowed(xml[ATTRIBUTE_ID]) !== null)
			? getStringAttributeValueEmptyAllowed(xml[ATTRIBUTE_ID])
			: "";
	if (optionPosition !== 0 && selectOption.id === "") {
		var message = 'Form object of a search at position '
				+ searchIndex
				+ ' contains \'select field\' at position '
				+ fieldIndex
				+ ' that has \'select option\' without \'id\' attribute. Only \'select option\' on the first position does not need to have \'id\' attribute. ';
		return setErrorOnObject(selectOption, [message]);
	}

	// if first option does not have ID attribute nor label attribute
	// error with appropriate message is set on a field option object
	selectOption.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (optionPosition === 0 && selectOption.id === "" && selectOption.label === null) {
		var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
				+ ' that has \'select option\' at first position without \'id\', \'label\' and \'labelId\' attributes. ';
		return setErrorOnObject(selectOption, [message]);
	}

	// if label does not exist, id will be used instead
	if (selectOption.label === null) {
		selectOption.label = selectOption.id;
	}
	return selectOption;
}

/**
 * Parses XML representation of field listed in 'finalSearchStage' element.
 * 
 * @param xml
 *            XML representation of field.
 * @param searchIndex
 *            position of a search element
 * @param fieldIndex
 *            position of a field in the form element
 * @returns Field object.
 */
function parseFinalSearchStageField(xml, searchIndex, fieldIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// field object JSON representation
	var field = {
		show : getShowFlag(xml[ATTRIBUTE_SHOW]),
		format : getFormat(xml[ATTRIBUTE_FORMAT]),
		sortable : getSortableFlag(xml[ATTRIBUTE_SORTABLE]),
		valid : true,
		errorMessages : []
	};

	// if field name attribute does not exist error with appropriate message is set on the field object
	field.name = getAttributeValue(xml, ATTRIBUTE_NAME, ATTRIBUTE_NAME_ID);
	if (field.name === null) {
		var message = null;

		message = 'Field object at position ' + fieldIndex + ' of a \'finalSearchStage\' element of the search object at position '
				+ searchIndex + ' does not have  \'name\' nor \'nameId\' attribute. ';
		return setErrorOnObject(field, [message]);
	}

	if (field.show === false) {
		return field;
	}

	// if field label does not exist, field name value will be used insead
	field.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (field.label === null) {
		field.label === field.name;
	}
	return field;
}

/**
 * Parses XML representation of resulting form field.
 * 
 * @param xml
 *            XML representation of field.
 * @param searchIndex
 *            position of a search element
 * @param fieldIndex
 *            position of a field in the form element
 * @returns Field object.
 */
function parseResultingFormField(xml, searchIndex, fieldIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// field object JSON representation
	var field = {
		show : getShowFlag(xml[ATTRIBUTE_SHOW]),
		position : getFieldPosition(xml[ATTRIBUTE_FIELD_POSITION]),
		valid : true,
		errorMessages : []
	};

	// if field name attribute does not exist error with appropriate message
	// is set on a field object
	field.name = getAttributeValue(xml, ATTRIBUTE_NAME, ATTRIBUTE_NAME_ID);
	if (field.name === null) {
		var message = 'Field object at position ' + fieldIndex + ' of a \'resultingForm\' element of the search object at position '
				+ searchIndex + ' does not have  \'name\' nor \'nameId\' attribute. ';
		return setErrorOnObject(field, [message]);
	}

	if (field.show === false) {
		return field;
	}

	// if field label does not exist, field name value will be used
	field.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (field.label === null) {
		field.label === field.name;
	}
	return field;
}

/**
 * Parses XML representation of search stage field.
 * 
 * @param xml
 *            XML representation of field.
 * @param searchIndex
 *            position of a search element
 * @param searchStageIndex
 *            position of a form in the search element
 * @param fieldIndex
 *            position of a field in the form element
 * @returns Field object.
 */
function parseSearchStageField(xml, searchIndex, searchStageIndex, fieldIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// field object JSON representation
	var field = {
		show : getShowFlag(xml[ATTRIBUTE_SHOW]),
		format : getFormat(xml[ATTRIBUTE_FORMAT]),
		sortable : getSortableFlag(xml[ATTRIBUTE_SORTABLE]),
		submit : getSubmitFlag(xml[ATTRIBUTE_SUBMIT]),
		submitValue : getStringAttributeValueEmptyAllowed(xml[ATTRIBUTE_SUBMIT_VALUE]),
		valid : true,
		errorMessages : []
	};

	// if field name attribute does not exist error with appropriate message is set on a field object
	field.name = getAttributeValue(xml, ATTRIBUTE_NAME, ATTRIBUTE_NAME_ID);
	if (field.name === null) {

		var message = 'Field object at position ' + fieldIndex + ' of a \'searchStage\' element at position ' + searchStageIndex
				+ ' of the search object at position ' + searchIndex + ' does not have  \'name\' nor \'nameId\' attribute. ';
		return setErrorOnObject(field, [message]);
	}

	if (field.show === false) {
		return field;
	}

	// if field label does not exist, field name value will be used
	field.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (field.label === null) {
		field.label === field.name;
	}
	return field;
}

/**
 * Calling remote services on provided url and parse response as select option.
 * 
 * @param url
 *            URL of a service that should be invoked.
 * @param field
 *            field that should be populated with retrieved search options
 * @param fieldIndex
 *            position of a field in the form element
 * @param searchIndex
 *            position of a search element
 * @param responseIDField
 *            value of responseIDField attributes that will be used in case that endpoint call returns array of objects
 *            with two keys
 * @param responseLabelField
 *            value of responseLabelField attribute that will be used in case that endpoint call returns array of
 *            objects with two keys
 * @returns Field object.
 */
function getSelectOptionFromRemoteService(url, field, fieldIndex, searchIndex, responseIDField, responseLabelField) {

	var response = null;

	try {
		response = remote.call(url);
	} catch (err) {
		return setErrorOnObject(field, [err.message]);
	}

	if (response.getStatus().getCode() < 200 || response.getStatus().getCode() >= 300) {
		var message = 'Form object of a search at position ' + searchIndex + 'contains \'select field\' at position ' + fieldIndex
				+ ' with URL attribute that does not returns valid response status code (' + response.status + '). Error message: '
				+ response.text.replace('"', '\'');
		return setErrorOnObject(field, [message]);
	}

	var jsonResponse = null;

	try {
		jsonResponse = eval('(' + (response.getResponse()) + ')');
	} catch (err) {
		var message = 'Error parsing JSON response for populating dropdown of field at position ' + fieldIndex
		' of a search at position ' + searchIndex + '. Error: ' + err;
		return setErrorOnObject(field, [message]);
	}

	if (typeof jsonResponse === 'undefined' && jsonResponse === null) {
		var message = 'Invocation of service for populating dropdown of field at position ' + fieldIndex
		' of a search at position ' + searchIndex + ' returned null.';
		return setErrorOnObject(field, [message]);
	}

	if (jsonResponse.constructor !== Array) {
		var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
				+ ' with URL which response is not an JS Array. ';
		return setErrorOnObject(field, [message]);
	}

	for (var i = 0; i < jsonResponse.length; i++) {

		var obj = jsonResponse[i];

		var selectOption = {
			valid : true
		};

		if (typeof obj === 'object') {

			if (responseIDField === null || responseLabelField === null) {
				var message = 'Form object of a search at position '
						+ searchIndex
						+ ' contains \'select field\' at position '
						+ fieldIndex
						+ ' with URL which response contains array of objects but \'responseIdField\' or \'responseLabelField\' attributes is missing. ';
				return setErrorOnObject(field, [message]);
			}

			if (!obj.hasOwnProperty(responseIDField)) {
				var message = 'Form object of a search at position ' + searchIndex + 'contains \'select field\' at position ' + fieldIndex
						+ ' with URL which response objects do not contain \'' + responseIDField + '\' property. ';
				return setErrorOnObject(field, [message]);
			}

			if (!obj.hasOwnProperty(responseLabelField)) {
				var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
						+ ' with URL which response objects do not contain \'' + responseLabelField + '\' property. ';
				return setErrorOnObject(field, [message]);
			}

			selectOption.id = "" + obj[responseIDField];
			selectOption.label = "" + obj[responseLabelField];

		} else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
			selectOption.id = obj;
			selectOption.label = obj;
		} else {
			continue;
		}

		field.selectOptions.push(selectOption);
	}

	return field;
}

/**
 * Parses XML representation of field.
 * 
 * @param xml
 *            XML representation of field.
 * @param searchIndex
 *            position of a search element
 * @param fieldIndex
 *            position of a field in the form element
 * @returns Field object.
 */
function parseFormField(xml, searchIndex, fieldIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// field object JSON representation
	var field = {
		type : getFieldType(xml[ATTRIBUTE_FIELD_TYPE]),
		position : getFieldPosition(xml[ATTRIBUTE_FIELD_POSITION]),
		show : getShowFlag(xml[ATTRIBUTE_SHOW]),
		submit : getSubmitFlag(xml[ATTRIBUTE_SUBMIT]),
		submitValue : getStringAttributeValueEmptyAllowed(xml[ATTRIBUTE_SUBMIT_VALUE]),
		fillUnique : getFillUniqueFlag(xml[ATTRIBUTE_FILL_UNIQUE]),
		valid : true,
		errorMessages : [],
	};

	// if field name attribute does not exist error with appropriate message
	// is set on a field object
	field.name = getAttributeValue(xml, ATTRIBUTE_NAME, ATTRIBUTE_NAME_ID);
	if (field.name === null) {
		var message = 'Form object of a search at position ' + searchIndex + ' contains \'field\' at position ' + fieldIndex
				+ ' that does not have  \'name\' nor \'nameId\' attribute. ';
		return setErrorOnObject(field, [message]);
	}

	if (field.type === FIELD_TYPE_DATERANGE) {

		// if field nameFrom attribute does not exist error with appropriate
		// message is set on a field object
		field.nameFrom = getAttributeValue(xml, ATTRIBUTE_NAME_FROM, ATTRIBUTE_NAME_FROM_ID);
		if (field.nameFrom === null) {
			var message = 'Form object of a search at position ' + searchIndex + ' contains \'daterange field\' at position ' + fieldIndex
					+ ' that does not have  \'nameFrom\' nor \'nameFromId\' attribute. ';
			return setErrorOnObject(field, [message]);
		}

		// if field nameTo attribute does not exist error with appropriate
		// message is set on a field object
		field.nameTo = getAttributeValue(xml, ATTRIBUTE_NAME_TO, ATTRIBUTE_NAME_TO_ID);
		if (field.nameTo === null) {
			var message = 'Form object of a search at position ' + searchIndex + ' contains \'daterange field\' at position ' + fieldIndex
					+ ' that does not have  \'nameTo\' nor \'nameToId\' attribute. ';
			return setErrorOnObject(field, [message]);
		}
	}

	// If field should not be shown than attributes related to rendering fields
	// will not be collected
	if (!field.show) {
		return field;
	}

	// if field label does not exist, field name value will be used
	field.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (field.label === null) {
		var message = 'Form object of a search at position ' + searchIndex + ' contains \'field\' at position ' + fieldIndex
				+ ' that does not have  \'label\' nor \'labelId\' attribute. ';
		return setErrorOnObject(field, [message]);
	}

	// if field description does not exist, field label value will be used
	field.description = getAttributeValue(xml, ATTRIBUTE_DESCRIPTION, ATTRIBUTE_DESCRIPTION_ID);
	if (field.description === null) {
		field.description = field.label;
	}

	// if field should be uniquely filled, attributes for setting another field value (fillFieldName and fillFieldValue)
	// will be also set to field object if exist.
	if (field.fillUnique) {
		var fillFieldName = getStringAttributeValue(xml[ATTRIBUTE_FILL_FIELD_NAME]);
		var fillFieldValue = getStringAttributeValueEmptyAllowed(xml[ATTRIBUTE_FILL_FIELD_VALUE]);

		if (fillFieldName !== null) {
			field.fillFieldName = fillFieldName;
			field.fillFieldValue = fillFieldValue;
		}
	}

	// in case that field type is 'select', select options needs to be parsed
	if (field.type === FIELD_TYPE_SELECT) {

		field.hideField = getSelectHiddenFlag(xml[ATTRIBUTE_HIDE_FIELD]);
		
		// if form does not contains at least one field element error with
		// appropriate message is set on a form object
		if (xml.option.length() === 0 && !field.hideField) {
			var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
					+ ' that does not contain any option element. ';
			return setErrorOnObject(field, [message]);
		}
		
		// if form does not contains at least one field element error with
		// appropriate message is set on a form object
		if (xml.option.length() !== 0 && field.hideField) {
			var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
			+ ' that should be hidden so no option tags are allowed. ';
			return setErrorOnObject(field, [message]);
		}

		field.selectOptions = [];

		// parsing select options one by one
		for ( var i in xml.option) {

			// parsing select option
			var fieldOption = parseSelectOption(xml.option[i], searchIndex, fieldIndex, parseInt(i));

			// fieldOptions that are null will be ignored
			if (fieldOption === null) {
				continue;
			}

			// if option element is not valid error with appropriate message is
			// set on a field object
			if (!fieldOption.valid) {
				return setErrorOnObject(field, fieldOption.errorMessages);
			}

			// adding field option
			field.selectOptions.push(fieldOption);
		}

		// checking if URL is provided to get more fieldOptions
		var url = getAttributeValue(xml, ATTRIBUTE_URL, ATTRIBUTE_URL_ID);

		var fillAfter = getStringAttributeValue(xml[ATTRIBUTE_FILL_AFTER]);
		var responseIDField = getStringAttributeValue(xml[ATTRIBUTE_RESPONSE_ID_FIELD]);
		var responseLabelField = getStringAttributeValue(xml[ATTRIBUTE_RESPONSE_LABEL_FIELD]);

		if (fillAfter !== null) {

			if (url === null) {
				var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
						+ ' that has \'fillAfter\' attribute but hoes not have \'url\' nor \'urlId\' atribute. ';
				return setErrorOnObject(field, [message]);
			}

			if (url.indexOf('/') !== 0) {
				var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
						+ ' that has URL attribute that does not start with character \'/\'. ';
				return setErrorOnObject(field, [message]);
			}

			if (!(/\?[^?]*=/.test(url))) {
				var message = 'Form object of a search at position '
						+ searchIndex
						+ ' contains \'select field\' at position '
						+ fieldIndex
						+ ' that has unalowed \'url\' attribute value. URL should end with \'?{paramName}=\' in case that \'fillAfter\' attribute is presented. ';
				return setErrorOnObject(field, [message]);
			}

			if (fillAfter === field.name) {
				var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
						+ ' that has same value for \'fillAfter\' and \'name\' attributes. ';
				return setErrorOnObject(field, [message]);
			}

			field.fillAfter = fillAfter;
			field.responseIDField = responseIDField;
			field.responseLabelField = responseLabelField;
			field.url = url;
		} else if (url !== null) {

			if (url.indexOf('/') !== 0) {
				var message = 'Form object of a search at position ' + searchIndex + ' contains \'select field\' at position ' + fieldIndex
						+ ' that has URL attribute that does not start with character \'/\'. ';
				return setErrorOnObject(field, [message]);
			}

			return getSelectOptionFromRemoteService(url, field, fieldIndex, searchIndex, responseIDField, responseLabelField);
		}
	}
	return field;
}

/**
 * Parses XML representation of response object.
 * 
 * @param xml
 *            XML representation of finalSearchStage
 * @param searchIndex
 *            position of a search element
 * @returns finalSearchStage object.
 */
function parseFinalSearchStage(xml, searchIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// finalSearchStage object JSON representation
	var finalSearchStage = {
		fields : [],
		valid : true,
		errorMessages : []
	}

	// if finalSearchStage 'label' attribute does not exist error with appropriate message is set on a finalSearchStage
	// object
	finalSearchStage.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (finalSearchStage.label === null) {
		var message = 'FinalSearchStage object of search at position ' + searchIndex + ' does not contain \'label\' attribute. ';
		return setErrorOnObject(finalSearchStage, [message]);
	}

	// if finalSearchStage description does not exist, label will be used
	// instead
	finalSearchStage.description = getAttributeValue(xml, ATTRIBUTE_DESCRIPTION, ATTRIBUTE_DESCRIPTION_ID);
	if (finalSearchStage.description === null) {
		finalSearchStage.description = finalSearchStage.label;
	}

	// parsing fields one by one
	for ( var i in xml.field) {

		var finalSearchStageField = parseFinalSearchStageField(xml.field[i], searchIndex, parseInt(i) + 1);

		// finalSearchStage Field that are null will be ignored
		if (finalSearchStageField === null) {
			continue;
		}

		// if finalSearchStage Field element is not valid error with appropriate
		// message is set on a finalSearchStage object
		if (!finalSearchStageField.valid) {
			return setErrorOnObject(finalSearchStage, finalSearchStageField.errorMessages);
		}

		// adding finalSearchStage Field to an array
		finalSearchStage.fields.push(finalSearchStageField);
	}

	if (finalSearchStage.fields.length === 0) {
		var message = 'FinalSearchStage object of  search at position ' + searchIndex + ' does not contains any field. ';
		return setErrorOnObject(finalSearchStage, [message]);

	}
	return finalSearchStage;
}

/**
 * Parses XML representation of response object.
 * 
 * @param xml
 *            XML representation of resultingForm
 * @param searchIndex
 *            position of a search element
 * @returns resultingForm object.
 */
function parseResultingForm(xml, searchIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// resultingForm object JSON representation
	var resultingForm = {
		upLeftFields : [],
		upRightFields : [],
		downLeftFields : [],
		hiddenFields : [],
		valid : true,
		errorMessages : []
	}

	// if resultingForm 'id' attribute does not exist error with appropriate
	// message is set on a resultingForm object
	resultingForm.id = getStringAttributeValue(xml[ATTRIBUTE_ID]);
	if (resultingForm.id === null) {
		var message = 'ResultingForm object of search at position ' + searchIndex + ' does not contain \'id\' attribute. ';
		return setErrorOnObject(resultingForm, [message]);
	}

	// if resultingForm label does not exist, id will be used instead
	resultingForm.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (resultingForm.label === null) {
		resultingForm.label = resultingForm.id;
	}

	// parsing fields one by one
	for ( var i in xml.field) {

		var resultingFormField = parseResultingFormField(xml.field[i], searchIndex, parseInt(i) + 1);

		// searchStageField that are null will be ignored
		if (resultingFormField === null) {
			continue;
		}

		// if resultingForm Field element is not valid error with appropriate message is set on a resultingFormField
		// object
		if (!resultingFormField.valid) {
			return setErrorOnObject(resultingForm, resultingFormField.errorMessages);
		}

		// adding resultingFormField to fields array based on resultingFormField
		// position attribute
		if (!resultingFormField.show) {
			resultingForm.hiddenFields.push(resultingFormField);
		} else if (resultingFormField.position === FIELD_POSITION_UP_LEFT) {
			resultingForm.upLeftFields.push(resultingFormField);
		} else if (resultingFormField.position === FIELD_POSITION_UP_RIGHT) {
			resultingForm.upRightFields.push(resultingFormField);
		} else if (resultingFormField.position === FIELD_POSITION_DOWN_LEFT) {
			resultingForm.downLeftFields.push(resultingFormField);
		}
	}

	// If form does not have fields, error with appropriate message is set on a resultingForm object
	if (resultingForm.upLeftFields.length === 0 && resultingForm.upRightFields.length === 0 && resultingForm.downLeftFields.length === 0) {
		var message = '';
		if (resultingForm.hiddenFields.length === 0) {
			message = 'ResultingForm object of search at position ' + searchIndex + ' does not contain any field. ';
		}
		message = 'ResultingForm object of search at position ' + searchIndex + ' does not contain any visible field. ';
		return setErrorOnObject(resultingForm, [message]);

	}
	return resultingForm;
}

/**
 * Parses XML representation of response object.
 * 
 * @param xml
 *            XML representation of searchStage
 * @param searchType
 *            searchType of XML representation of search
 * @param searchIndex
 *            position of a search element
 * @param searchStageIndex
 *            position of a searchStage element of search element
 * @returns searchStage object.
 */
function parseSearchStage(xml, searchType, searchIndex, searchStageIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// field object JSON representation
	var searchStage = {
		fields : [],
		valid : true,
		errorMessages : []
	}

	// if searchStage 'id' attribute does not exist error with appropriate
	// message is
	// set on a searchStage object
	searchStage.id = getStringAttributeValue(xml[ATTRIBUTE_ID]);
	if (searchStage.id === null) {
		var message = 'SearchStage object at position ' + searchStageIndex + ' of a search at position ' + searchIndex
				+ ' does not contain \'id\' attribute. ';
		return setErrorOnObject(searchStage, [message]);
	}

	// if searchStage label does not exist, id will be used instead
	searchStage.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (searchStage.label === null) {
		searchStage.label = searchStage.id;
	}

	// if searchStage description does not exist, label will be used instead
	searchStage.description = getAttributeValue(xml, ATTRIBUTE_DESCRIPTION, ATTRIBUTE_DESCRIPTION_ID);
	if (searchStage.description === null) {
		searchStage.description = searchStage.label;
	}

	// If search stage is at position 1 and search type is 'twoSearchStage' than
	// 'nextSearchStage' must exist
	if (searchType === SEARCH_TYPE_TWO_SEARCH_STAGE && searchStageIndex === 1) {

		// if searchStage nextSearchStage attribute does not exist error with
		// appropriate message is set on a searchStage object
		searchStage.nextSearchStage = getStringAttributeValue(xml[ATTRIBUTE_NEXT_SEARCH_STAGE]);
		if (searchStage.nextSearchStage === null) {
			var message = 'SearchStage object at position '
					+ searchStageIndex
					+ ' of search at position '
					+ searchIndex
					+ ' does not have \'nextSearchStage\' attribute. This attribute is mandatory for the \'searchStage\' at position 1 in case that \'searchType\' is \'twoSearchStage\'';
			return setErrorOnObject(searchStage, [message]);
		}
	}

	// if searchType URL attribute does not exist error with appropriate message is set on a searchType object
	searchStage.url = getAttributeValue(xml, ATTRIBUTE_URL, ATTRIBUTE_URL_ID);
	if (searchStage.url === null) {
		var message = 'SearchStage object at position ' + searchStageIndex + ' of search at position ' + searchIndex
				+ ' does not contains \'url\' attribute. ';
		return setErrorOnObject(searchStage, [message]);
	}

	// setting urlType attribute
	setUrlType(getStringAttributeValue(xml[ATRIBUTE_URL_TYPE]), searchStage, searchIndex, "SearchStage");

	// after setUrlType method is called, searchStage object can be in invalid state.
	if (!searchStage.valid) {
		return searchStage;
	}

	// parsing fields one by one
	for ( var i in xml.field) {

		var searchStageField = parseSearchStageField(xml.field[i], searchIndex, searchStageIndex, parseInt(i) + 1);

		// searchStageField that are null will be ignored
		if (searchStageField === null) {
			continue;
		}

		// if searchStage Field element is not valid error with appropriate
		// message is
		// set on a field object
		if (!searchStageField.valid) {
			return setErrorOnObject(searchStage, searchStageField.errorMessages);
		}

		// adding searchStage Field to an array
		searchStage.fields.push(searchStageField);
	}

	if (searchStage.fields.length === 0) {
		var message = 'SearchStage object at position ' + searchStageIndex + ' of search at position ' + searchIndex
				+ ' does not contains any field. ';
		return setErrorOnObject(searchStage, [message]);

	}
	return searchStage;
}

/**
 * Parses XML representation of form.
 * 
 * @param xml
 *            XML representation of form
 * @param searchIndex
 *            position of a search element
 * @returns Form object.
 */
function parseSecondForm(xml, searchIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// form object JSON representation
	var secondForm = {
		upLeftFields : [],
		upRightFields : [],
		downLeftFields : [],
		hiddenFields : [],
		selectFieldListeners : [],
		valid : true,
		errorMessages : []
	};

	// if secondForm does not contains at least one field element error with
	// appropriate message is set on a sescondFrom object
	if (xml.field.length() === 0) {
		var message = 'SecondForm object of search at position ' + searchIndex + ' needs to contain at least one \'field\' element. ';
		return setErrorOnObject(secondForm, [message]);
	}

	var selectFieldNames = [];

	// parsing fields one by one
	for ( var i in xml.field) {

		// parsing field
		var field = parseFormField(xml.field[i], searchIndex, parseInt(i) + 1);

		// fields that are null will be ignored
		if (field === null) {
			continue;
		}

		// if field element is not valid error with appropriate message is set
		// on a secondForm object
		if (!field.valid) {
			return setErrorOnObject(secondForm, field.errorMessages);
		}

		// Save field if its type is 'select'
		if (field.type === FIELD_TYPE_SELECT) {
			selectFieldNames.push(field.name);

			if (typeof field.fillAfter !== 'undefined') {
				var listenerData = {};

				listenerData.fillAfter = field.fillAfter;
				listenerData.name = field.name;

				secondForm.selectFieldListeners.push(listenerData);
			}
		}

		// adding field to fields array based on field position attribute
		if (!field.show) {
			secondForm.hiddenFields.push(field);
		} else if (field.position === FIELD_POSITION_UP_LEFT) {
			field.index = secondForm.upLeftFields.length;
			secondForm.upLeftFields.push(field);
		} else if (field.position === FIELD_POSITION_UP_RIGHT) {
			field.index = secondForm.upRightFields.length;
			secondForm.upRightFields.push(field);
		} else if (field.position === FIELD_POSITION_DOWN_LEFT) {
			field.index = secondForm.downLeftFields.length;
			secondForm.downLeftFields.push(field);
		}
	}

	// Check that fillAfter property contains actual select field name value
	for (var i = 0; i < secondForm.selectFieldListeners.length; i++) {

		var fillAfterName = secondForm.selectFieldListeners[i].name;
		if (selectFieldNames.indexOf(fillAfterName) === -1) {
			var message = 'SecondForm object of search at position ' + searchIndex
					+ ' contains \'select\' field with \'fillAfter\' attribute value that does not match any field on this form. ';
			return setErrorOnObject(secondForm, [message]);

		}
	}

	return secondForm;
}

/**
 * Parses XML representation of form.
 * 
 * @param xml
 *            XML representation of form
 * @param searchType
 *            searchType of XML representation of search
 * @param searchIndex
 *            position of a search element
 * @returns Form object.
 */
function parseForm(xml, searchType, searchIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// form object JSON representation
	var form = {
		horizontalOrSeparator : getOrSeparatorFlag(xml[ATTRIBUTE_HORIZONTAL_OR_SEPARATOR]),
		verticalOrSeparator : getOrSeparatorFlag(xml[ATTRIBUTE_VERTICAL_OR_SEPARATOR]),
		upLeftFields : [],
		upRightFields : [],
		downLeftFields : [],
		hiddenFields : [],
		selectFieldListeners : [],
		valid : true,
		errorMessages : []
	};

	// if form label does not exist error with appropriate message is set on a
	// form object
	form.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (form.label === null) {
		var message = 'Form object of search at position ' + searchIndex + ' does not have \'label\' attribute. ';
		return setErrorOnObject(form, [message]);
	}

	// if description does not exist, label will be used for that purpose
	form.description = getAttributeValue(xml, ATTRIBUTE_DESCRIPTION, ATTRIBUTE_DESCRIPTION_ID);
	if (form.description === null) {
		form.description = form.label;
	}

	// if searchType is not 'noSearchStage' than 'nextSearchStage' and
	// 'resultingFormId' attributes should exist
	if (searchType !== SEARCH_TYPE_NO_SEARCH_STAGE) {

		// if form nextSearchStage attribute does not exist error with
		// appropriate message is set on a form object
		form.nextSearchStage = getStringAttributeValue(xml[ATTRIBUTE_NEXT_SEARCH_STAGE]);
		if (form.nextSearchStage === null) {
			var message = 'Form object of search at position '
					+ searchIndex
					+ ' does not have \'nextSearchStage\' attribute. This attribute is mandatory in case that \'searchType\' is not \'noSearchStage\'';
			return setErrorOnObject(form, [message]);
		}

		// if form nextSearchStage attribute does not exist error with appropriate
		// message is set on a form object
		form.resultingFormId = getStringAttributeValue(xml[ATTRIBUTE_RESULTING_FORM_ID]);
		if (form.resultingFormId === null) {
			var message = 'Form object of search at position '
					+ searchIndex
					+ ' does not have \'resultingFormId\' attribute. This attribute is mandatory in case that \'searchType\' is not \'noSearchStage\'';
			return setErrorOnObject(form, [message]);
		}
	}

	// if form URL attribute does not exist error with appropriate message
	// is set on a form object
	form.url = getAttributeValue(xml, ATTRIBUTE_URL, ATTRIBUTE_URL_ID);
	if (form.url === null) {
		var message = 'Form object of search at position ' + searchIndex + ' does not contain \'url\' nor \'urlId\'attribute. ';
		return setErrorOnObject(form, [message]);
	}

	// setting urlType attribute
	setUrlType(getStringAttributeValue(xml[ATRIBUTE_URL_TYPE]), form, searchIndex, "Form");

	// after setUrlType method is called, form object can be in invalid
	// state.
	if (!form.valid) {
		return searchStage;
	}

	// if form does not contains at least one field element error with
	// appropriate message is set on the form object
	if (xml.field.length() === 0) {
		var message = 'Form object of search at position ' + searchIndex + ' needs to contain at least one \'field\' element. ';
		return setErrorOnObject(form, [message]);
	}

	var selectFieldNames = [];

	// parsing fields one by one
	for ( var i in xml.field) {

		// parsing field
		var field = parseFormField(xml.field[i], searchIndex, parseInt(i) + 1);

		// fields that are null will be ignored
		if (field === null) {
			continue;
		}

		// if field element is not valid error with appropriate message is set
		// on a form object
		if (!field.valid) {
			return setErrorOnObject(form, field.errorMessages);
		}

		// Save field if its type is 'select'
		if (field.type === FIELD_TYPE_SELECT) {
			selectFieldNames.push(field.name);

			if (typeof field.fillAfter !== 'undefined') {
				var listenerData = {};

				listenerData.fillAfter = field.fillAfter;
				listenerData.name = field.name;

				form.selectFieldListeners.push(listenerData);
			}
		}

		// adding field to fields array based on field position attribute
		if (!field.show) {
			form.hiddenFields.push(field);
		} else if (field.position === FIELD_POSITION_UP_LEFT) {
			field.index = form.upLeftFields.length;
			form.upLeftFields.push(field);
		} else if (field.position === FIELD_POSITION_UP_RIGHT) {
			field.index = form.upRightFields.length;
			form.upRightFields.push(field);
		} else if (field.position === FIELD_POSITION_DOWN_LEFT) {
			field.index = form.downLeftFields.length;
			form.downLeftFields.push(field);
		}
	}

	// Check that fillAfter property contains actual select field name value
	for (var i = 0; i < form.selectFieldListeners.length; i++) {

		var fillAfterName = form.selectFieldListeners[i].name;
		if (selectFieldNames.indexOf(fillAfterName) === -1) {
			var message = 'Form object of search at position ' + searchIndex
					+ ' contains \'select\' field with \'fillAfter\' attribute value that does not match any field on this form. ';
			return setErrorOnObject(secondForm, [message]);
		}
	}
	return form;
}

/**
 * Parses XML representation of search.
 * 
 * @param xml
 *            XML representation of search
 * @param searchIndex
 *            position of a search element
 * @returns Search object.
 */
function parseSearch(xml, searchIndex) {

	if (typeof xml === VALUE_UNDEFINED || xml === null) {
		return null;
	}

	// search object JSON representation
	var search = {
		searchType : getSearchType(xml[ATTRIBUTE_SEARCH_TYPE]),
		forms : [],
		finalSearchStageForm : {},
		valid : true,
		errorMessages : []
	};

	// if search ID does not exist error with appropriate message is set on a
	// search object
	search.id = getStringAttributeValue(xml[ATTRIBUTE_ID]);
	if (search.id === null) {
		var message = 'Search at position ' + searchIndex + ' does not have \'id\' attribute. ';
		return setErrorOnObject(search, [message]);
	}

	// if search label does not exist error with appropriate message is set on a
	// search object
	search.label = getAttributeValue(xml, ATTRIBUTE_LABEL, ATTRIBUTE_LABEL_ID);
	if (search.label === null) {
		var message = 'Search at position ' + searchIndex + ' does not have \'label\' attribute. ';
		return setErrorOnObject(search, [message]);
	}

	// if description does not exist, label will be used for that purpose
	search.description = getAttributeValue(xml, ATTRIBUTE_DESCRIPTION, ATTRIBUTE_DESCRIPTION_ID);
	if (search.description === null) {
		search.description = search.label;
	}

	// if passed in XML object does not contain exactly one form element error
	// with appropriate message is set on a search object
	if (typeof xml.form === VALUE_UNDEFINED || xml.form === null || xml.form.length() > 1) {
		var message = 'Search at position ' + searchIndex + ' needs to exactlu one \'form\' element. ';
		return setErrorOnObject(search, [message]);
	}

	// if passed in XML object does not contain exactly one finalSearchStage
	// element, error with appropriate message is set on a search object
	if (xml.finalSearchStage.length() !== 1) {
		var message = 'Search at position ' + searchIndex + ' needs to have exactly one \'finalSearchStage\' element. ';
		return setErrorOnObject(search, [message]);
	}

	// if searchType is \'noSearchStage\' and passed in XML object contains
	// resultingForm element, error with appropriate message is set on a search
	// object
	if (search.searchType === SEARCH_TYPE_NO_SEARCH_STAGE && xml.secondForm.length() !== 0) {
		var message = 'Search at position ' + searchIndex
				+ ' should not have \'secondForm\' element in case that \'searchType\' is \'noSearchStage\'. ';
		return setErrorOnObject(search, [message]);
	}

	// if searchType is \'noSearchStage\' and passed in XML object contains
	// resultingForm element, error with appropriate message is set on a search
	// object
	if (search.searchType === SEARCH_TYPE_NO_SEARCH_STAGE && xml.resultingForm.length() !== 0) {
		var message = 'Search at position ' + searchIndex
				+ ' should not have \'resultingForm\' element in case that \'searchType\' is \'noSearchStage\'. ';
		return setErrorOnObject(search, [message]);
	}

	// if searchType is \'oneSearchStage\' or \'twoSearchStage\' and passed in
	// XML object does not contain exactly one resultingForm element, error with
	// appropriate message is set on a search object
	if ((search.searchType === SEARCH_TYPE_ONE_SEARCH_STAGE || search.searchType === SEARCH_TYPE_TWO_SEARCH_STAGE)
			&& xml.resultingForm.length() !== 1) {
		var message = 'Search at position '
				+ searchIndex
				+ ' needs to have exactly one \'resultingForm\' element in case that \'searchType\' is \'oneSearchStage\' or \'twoSearchStage\'. ';
		return setErrorOnObject(search, [message]);
	}

	// if search type is 'noSearchStage' than search should not contain
	// any searchStage element
	if (search.searchType === SEARCH_TYPE_NO_SEARCH_STAGE && xml.searchStage.length() !== 0) {
		var message = 'Search at position ' + searchIndex
				+ ' should not contain any \'searchStage\' element in case that \'searchType\' is \'noSearchStage\'. ';
		return setErrorOnObject(search, [message]);
	}

	// if search type is 'oneSearchStage' than search should contain
	// exactly one searchStage element
	if (search.searchType === SEARCH_TYPE_ONE_SEARCH_STAGE && xml.searchStage.length() !== 1) {
		var message = 'Search at position ' + searchIndex
				+ ' should contain exactly one \'searchStage\' element in case that searchType is \'oneSearchStage\'. ';
		return setErrorOnObject(search, [message]);
	}

	// if search type is 'twoSearchStage' than search should contain
	// exactly two searchStage elements
	if (search.searchType === SEARCH_TYPE_TWO_SEARCH_STAGE && xml.searchStage.length() !== 2) {
		var message = 'Search at position ' + searchIndex
				+ ' should contain exactly two \'searchStage\' elements in case that \'searchType\' is \'twoSearchStage\'. ';
		return setErrorOnObject(search, [message]);
	}

	// Parsing form
	var form = parseForm(xml.form[0], search.searchType, searchIndex);

	// if form element is not valid error with appropriate message is set
	// on a form object
	if (!form.valid) {
		return setErrorOnObject(search, form.errorMessages);
	}

	if (typeof form.nextSearchStage !== VALUE_UNDEFINED && form.nextSearchStage !== null) {

		form.searchStageCollection = {};

		// parsing searchStage objects one by one
		for ( var i in xml.searchStage) {

			// getting parsed object
			var searchStage = parseSearchStage(xml.searchStage[i], search.searchType, searchIndex, parseInt(i) + 1);

			if (typeof searchStage === VALUE_UNDEFINED || searchStage === null) {
				continue;
			}

			// if searchStage element is not valid error with appropriate
			// message is set on a search object
			if (!searchStage.valid) {
				return setErrorOnObject(search, searchStage.errorMessages);
			}

			// adding parsed searchStage to searchStage object of the form
			// object. ID of the searchStage will be use as a property name
			form.searchStageCollection[searchStage.id] = searchStage;
		}

		// if searchStage with nextSearchStage attribute does not exist,
		// error with appropriate message is set on a search object
		var firstSearchStageIdAttribute = form.nextSearchStage;
		if (typeof form.searchStageCollection[firstSearchStageIdAttribute] === VALUE_UNDEFINED
				|| form.searchStageCollection[firstSearchStageIdAttribute] === null) {
			var message = 'First form of search at position ' + searchIndex + ' has \'nextSearchStage\' attribute value \''
					+ firstSearchStageIdAttribute + '\', but search does not contain \'searchStage\' element with that ID . ';
			return setErrorOnObject(search, [message]);
		}

		// if searchStage with firstSearchStage nextSearchStage
		// attribute does not exist, error with appropriate
		// message is set on a search object
		var secondSearchStageIdAttribute = form.searchStageCollection[firstSearchStageIdAttribute].nextSearchStage;
		if (search.searchType === SEARCH_TYPE_TWO_SEARCH_STAGE
				&& (typeof form.searchStageCollection[secondSearchStageIdAttribute] === VALUE_UNDEFINED || form.searchStageCollection[secondSearchStageIdAttribute] === null)) {
			var message = 'First searchStage element of search at position ' + searchIndex + ' has \'nextSearchStage\' attribute value \''
					+ secondSearchStageIdAttribute + '\', but search does not contain \'searchStage\' element with that ID . ';
			return setErrorOnObject(search, [message]);
		}

		// parsing resulting form
		var resultingForm = parseResultingForm(xml.resultingForm[0], searchIndex);

		if (typeof resultingForm === VALUE_UNDEFINED || resultingForm === null) {
			var message = 'ResultingForm object of search at position ' + searchIndex + ' does not exist. ';
			return setErrorOnObject(resultingForm, [message]);
		}

		// if resultingForm element is not valid error with appropriate
		// message is set on a resultingForm object
		if (!resultingForm.valid) {
			return setErrorOnObject(search, resultingForm.errorMessages);
		}

		if (form.resultingFormId !== resultingForm.id) {
			var message = 'ResultingForm object of search at position ' + searchIndex + ' has ID \'' + resultingForm.id
					+ '\' that does not match any form. ';
			return setErrorOnObject(search, [message]);
		}

		// adding parsed resultingForm to resultingForm object of the form
		// object.
		form.resultingForm = resultingForm;
	}

	// if form element is not valid error with appropriate message is set on
	// a search object
	if (!form.valid) {
		return setErrorOnObject(search, form.errorMessages);
	}

	// adding form to forms array of a search
	search.forms.push(form);

	// parsing secondForm form
	if (xml.secondForm.length() !== 0) {

		// Parsing form
		var secondForm = parseSecondForm(xml.secondForm[0], searchIndex);

		// if secondForm element is not valid error with appropriate message is
		// set on a form object
		if (!secondForm.valid) {
			return setErrorOnObject(search, secondForm.errorMessages);
		}
		search.forms.push(secondForm);
	}

	// parsing resulting form
	var finalSearchStageForm = parseFinalSearchStage(xml.finalSearchStage[0], searchIndex);

	if (typeof finalSearchStageForm === VALUE_UNDEFINED || finalSearchStageForm === null) {
		var message = 'FinalSearchStage object of search at position ' + searchIndex + ' does not exist. ';
		return setErrorOnObject(finalSearchStageForm, [message]);
	}

	// if finalSearchStageForm element is not valid error with appropriate
	// message is set on a finalSearchStageForm object
	if (!finalSearchStageForm.valid) {
		return setErrorOnObject(search, finalSearchStageForm.errorMessages);
	}

	// adding parsed finalSearchStageForm to finalSearchStageForm object of the
	// form object.
	search.finalSearchStageForm = finalSearchStageForm;

	return search;
}

/**
 * Parses XML configuration.
 * 
 * @returns Parsed search array.
 */
function parseConfiguration() {
	// getting configuration file as XML
	var cfg = new XML(config.script), forms;

	// searches array
	searches = [];

	// Keep record of search IDs
	searchIds = [];

	// parsing each search one by one
	for ( var i in cfg.search) {

		// parsing search at position i
		var search = parseSearch(cfg.search[i], parseInt(i) + 1);

		// if search is null or ID does not exist it will not be added to search
		// array
		if (typeof search !== VALUE_UNDEFINED && search !== null && search.id !== null) {

			// if searchId is already in use error with
			// appropriate message is set on a search object
			if (searchIds.indexOf(search.id) !== -1) {
				var message = 'Search at position ' + i + ' have ID (\'' + search.id + '\') that is already in use. ';
				search = setErrorOnObject(search, [message]);
			} else {
				// adding current search ID to the searchIds array
				searchIds.push(search.id);
			}
			searches.push(search);
		}
	}
	return searches;
}

function main() {

	// Parsing configuration file
	var searches = parseConfiguration(), widgets = [];
	
	// Passing searchForms to the model
	model.searches = searches;

	// dashlet resizer widget
	widgets.push({
		id : "DashletResizer",
		name : "Alfresco.widget.DashletResizer",
		initArgs : ["\"" + args.htmlid + "\"", "\"" + instance.object.id + "\""],
		useMessages : false
	});

	// dashlet title bar widget
	widgets.push({
		id : "DashletTitleBarActions",
		name : "Alfresco.widget.DashletTitleBarActions",
		useMessages : false,
		options : {
			actions : [{
				cssClass : "help",
				tooltip : msg.get("dashlet.help.tooltip"),
				bubbleOnClick : {
					message : msg.get("dashlet.search.help")
				}
			}]
		}
	});

	// custom widget to handle search dashlet
	widgets.push({
		id : "SearchDashlet",
		name : "Alfresco.SearchDashlet",
		options : {
			searchArray : model.searches
		}
	});

	// Passing widgets to the model
	model.widgets = widgets;
};

main();