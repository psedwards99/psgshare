<@markup id="css" >
	<@link href="${url.context}/res/components/search/search-dashlet.css" group="person-search"/>
</@>

<@markup id="js">
	<#-- JavaScript Dependencies -->
	<@script type="text/javascript" src="${url.context}/res/components/search/search-dashlet.js" group="person-search"/>
   	<@script type="text/javascript" src="${url.context}/res/components/form/date-range.js" group="person-search"/>
	<@script type="text/javascript" src="${url.context}/res/components/form/date-picker.js" group="person-search"/>
	<@script type="text/javascript" src="${url.context}/res/components/form/date.js" group="person-search"/>
</@>


<@markup id="widgets">
	<@createWidgets group="person-search"/>
</@>

<@markup id="html">
	<@uniqueIdDiv>
		<#assign el=args.htmlid?html>
		<div class="dashlet">
			<div class="title">${msg("dashlet.search.title")?html}</div>
			
			<div class="toolbar">
				<div class="toolbar-button-container"> 
	         		<span class="search-for" >${msg("dashlet.search.search_button.label")?html}:</span>
	       			
					<#-- component to show list of forms, displays current form -->
					<span class="selected-form-button">
						<span id="${el}-selected-form-button" class="yui-button yui-menu-button selected-form-button-span">
							<span class="first-child">
								<button type="button" tabindex="0"></button>
							</span>
						</span>
					</span>
				</div> 
       			
				<#-- menu list of available forms -->
				<div id="${el}-selected-form-list" class="yuimenu" style="visibility:hidden">
					<div class="bd">
						<ul>
							<#list searches as s>
								<#if s.valid || (s.label)??>
									<li>
										<span class="form-type-name" tabindex="0">${s.label?html}</span>
										<span class="form-type-description">${s.description?html}</span>
									</li>
								<#else>
									<li>
										<span class="form-type-name" tabindex="0">${s.id?html}</span>
										<span class="form-type-description">${msg("dashlet.search.search_button.description.error")?html}</span>
									</li>
								</#if>
							</#list>
						</ul>
					</div>
				</div>
			</div>
			
			<div id="${el}-body" class="body" <#if args.height??>style="height: ${args.height?html}px;"</#if>>
				<@uniqueIdDiv>
					<div id="${el}-initial-search-stage-container" class="initial-search-stage-container">
	     				<div id="${el}-form-container" class="forms">
	     					<#list searches as s>
	     						<#if !s.valid>
	     							<div id="${s.id?html}-error-container" class="error-container hidden-div">
	     								<p class="error-title">
	     									${msg("dashlet.search.form.title.error")?html}:
	     								</p>
	     							
	     								<ul class="error-message">
		     								<#list s.errorMessages as message>
		     									<li>${message?html?html}</li>
		     								</#list>
	     								</ul>
									</div>
	     						<#else>
	     							<div id="${s.id?html}-container" class="hidden-div search-container">
	     								
	     								<#if s.searchType != "noSearchStage">
		     								<div id="${s.id?html}-resulting-form-container" class="form-container hidden-div">
	     										<@renderResultingFormContainer searchId=s.id?html jsonForm=s.forms[0].resultingForm/>
	     									</div>
	     								</#if>
	     							
	     								
     									<div id="${s.id?html}-0-container" class="form-container">
     										<@renderFormContainer searchId=s.id?html jsonForm=s.forms[0] formIndex="0"/>
     									</div>
     									
     									<#if s.forms[1]??>
     										<div id="${s.id?html}-1-container" class="form-container">
     											<@renderSecondFormContainer searchId=s.id?html jsonForm=s.forms[1] formIndex="1"/>
     										</div>
     									</#if>
	     							</div>
	     						</#if>
	     					</#list>
	     				</div>
	     				
	     				<div class="middle-search-stage-container" >
	     					<div id="${el}-first-search-stage" class="first-search-stage hidden-div" >
		     					<div class="first-search-stage-title" > 
									<p id="${el}-first-search-stage-title"></p>
								</div>
								
		     					<div id="${el}-first-search-stage-data" class="first-search-stage-data "></div>
		     					
		     					<div id="${el}-first-search-stage-paginator" class="first-search-stage-paginator"></div>
	     					</div>
	     					
	     					<div id="${el}-second-search-stage" class="second-search-stage hidden-div" >
		     					<div class="second-search-stage-title"" > 
									<p id="${el}-second-search-stage-title"></p>
								</div>
								
		     					<div id="${el}-second-search-stage-data" class="second-search-stage-data"></div>
		     					
		     					<div id="${el}-second-search-stage-paginator" class="second-search-stage-paginator"></div>
	     					</div>
	     				</div>
					</div>
	     			
	     			
					<div id="${el}-final-search-stage" class="final-search-stage-container hidden-div">

						<div id="${el}-final-search-stage-header" class="final-search-stage-header">
							<div class="final-search-stage-title" > 
								<p id="${el}-final-search-stage-title"></p>
							</div>
							
							<div>
								<label for="${el}-final-search-stage-filter" title="Data result filter" />Filter results:</label>
								<input id="${el}-final-search-stage-filter" type="text" title="Data result filter" />
								
								<span id="${el}-final-search-stage-filter-button" class="final-search-stage-filter" data-listener-attached="false">
									<button class="filter-button" type="button">Filter</button> 
								</span>
								
								<span id="${el}-final-search-stage-back-button" class="final-search-stage-back-button" data-listener-attached="false">  
									<button class="form-back-button" type="button">${msg("dashlet.search.back_button.label")?html}</button>
								</span> 
							</div>
						</div>
								
		     			<div id="${el}-final-search-stage-data" class="final-search-stage-data">
				     	</div>
		     					
		     			<div id="${el}-final-search-stage-paginator" class="final-search-stage-paginator">
				     	</div>
	     			</div>	
				</@>
			</div>
		</div>
	</@>
</@>

<#macro renderFormContainer searchId jsonForm formIndex>
	<div class="form-title" > 
		<p title="${jsonForm.description?html}">${jsonForm.label?html}</p>
	</div> 

	<form id="${searchId}-${formIndex}">
		<#if jsonForm.upLeftFields?has_content || jsonForm.upRightFields?has_content>
			<div class="up-form-container">
				<div class="up-left-form-container">
					<#if jsonForm.upLeftFields?has_content>
						<@renderFormFields fields=jsonForm.upLeftFields searchId=searchId formIndex=formIndex/>
					</#if>
				</div>
				
				<div class="horizontal-or-separator or-separator" <#if !jsonForm.upRightFields?has_content && !jsonForm.horizontalOrSeparator>style="visibility:hidden;"</#if>>
					<p>${msg("dashlet.search.separator.label")?html}</p>
				</div>
				
				<div class="up-right-form-container">
					<#if jsonForm.upRightFields?has_content>
						<@renderFormFields fields=jsonForm.upRightFields searchId=searchId formIndex=formIndex/>
					<#else> 
						<@renderInvisibleFormFields position="upRight" searchId=searchId formIndex=formIndex />
					</#if>
				</div>
			</div>
			
			<#if jsonForm.verticalOrSeparator && jsonForm.downLeftFields?has_content>
				<div class="vertical-or-separator or-separator">
					<p>${msg("dashlet.search.separator.label")?html}</p>
				</div>
			</#if>
		</#if>
  		
  		<div class="down-form-container">
  			<div class="down-left-form-container">
				<#if jsonForm.downLeftFields?has_content>
					<@renderFormFields fields=jsonForm.downLeftFields searchId=searchId formIndex=formIndex/>
				</#if> 
				
				<#if jsonForm.hiddenFields?has_content>
					<@renderHiddenFormFields hiddenFields=jsonForm.hiddenFields searchId=searchId formIndex=formIndex/>
				</#if> 
			</div>
				
			<div class="down-right-form-container">
				<div class="form-buttons"> 
					<span id="${searchId}-${formIndex}-form-search-button" > 
						<button class="form-search-button" type="button">${msg("dashlet.search.search_button.label")?html}</button>
					</span>
					
					<span id="${searchId}-${formIndex}-form-clear-button">  
						<button class="form-clear-button" type="button">${msg("dashlet.search.clear_button.label")?html}</button>
					</span> 
				</div> 
 			</div>
  		</div>
	</form>
</#macro>

<#macro renderSecondFormContainer searchId jsonForm formIndex>

	<form id="${searchId}-${formIndex}">
		<#if jsonForm.upLeftFields?has_content || jsonForm.upRightFields?has_content>
			<div class="up-form-container">
				<div class="up-left-form-container">
					<#if jsonForm.upLeftFields?has_content>
						<@renderFormFields fields=jsonForm.upLeftFields searchId=searchId formIndex=formIndex/>
					</#if>
				</div>
				
				<div class="horizontal-or-separator or-separator" style="visibility:hidden;">
					<p>${msg("dashlet.search.separator.label")?html}</p>
				</div>
				
				<div class="up-right-form-container">
					<#if jsonForm.upRightFields?has_content>
						<@renderFormFields fields=jsonForm.upRightFields searchId=searchId formIndex=formIndex/>
					<#else> 
						<@renderInvisibleFormFields position="upRight" searchId=searchId formIndex=formIndex />
					</#if>
				</div>
			</div>
		</#if>
  		
  		<div class="down-form-container">
  			<div class="down-left-form-container">
				<#if jsonForm.downLeftFields?has_content>
					<@renderFormFields fields=jsonForm.downLeftFields searchId=searchId formIndex=formIndex/>
				</#if> 
				
				<#if jsonForm.hiddenFields?has_content>
					<@renderHiddenFormFields hiddenFields=jsonForm.hiddenFields searchId=searchId formIndex=formIndex/>
				</#if> 
			</div>
				
			<div class="down-right-form-container">
				<div id="${searchId}-${formIndex}-form-button-container" class="form-buttons hidden-div"> 
					<span id="${searchId}-${formIndex}-form-search-button"> 
						<button class="form-search-button" type="button">${msg("dashlet.search.search_button.label")?html}</button>
					</span>
					
					<span id="${searchId}-${formIndex}-form-clear-button">  
						<button class="form-clear-button" type="button">${msg("dashlet.search.back_button.label")?html}</button>
					</span> 
				</div> 
 			</div>
  		</div>
	</form>
</#macro>

<#macro renderResultingFormContainer searchId jsonForm>
	<div class="form-title" > 
		<p>${jsonForm.label?html}</p>
	</div> 

	<form id="${searchId}-resulting-form">
		<#if jsonForm.upLeftFields?has_content || jsonForm.upRightFields?has_content>
			<div class="up-form-container">
				<div class="up-left-form-container">
					<#if jsonForm.upLeftFields?has_content>
						<#list jsonForm.upLeftFields as f>
							<@renderReadOnlyField field=f searchId=searchId itemIndex=f_index />
						</#list>
					</#if>
					
					<#if jsonForm.hiddenFields?has_content>
						<@renderHiddenFormFields hiddenFields=jsonForm.hiddenFields searchId=searchId formIndex="resulting-form"/>
					</#if> 
				</div>
				
				<div class="horizontal-or-separator or-separator" style="visibility:hidden;">
					<p>${msg("dashlet.search.separator.label")?html}</p>
				</div>
				
				<div class="up-right-form-container">
					<#if jsonForm.upRightFields?has_content>
						<#list jsonForm.upRightFields as f>
							<@renderReadOnlyField field=f searchId=searchId itemIndex=f_index />
						</#list>
					<#else> 
						<@renderInvisibleFormFields position="upRight" searchId=searchId formIndex="resulting-form" />
					</#if>
				</div>
			</div>
		</#if>
		
		<div class="down-form-container">
  			<div class="down-left-form-container">
  				<#if jsonForm.downLeftFields?has_content>
					<#list jsonForm.downLeftFields as f>
						<@renderReadOnlyField field=f searchId=searchId itemIndex=f_index />
					</#list>
				</#if>
			</div>
				
			<div class="down-right-form-container">
				<div id="${searchId}-resulting-form-button-container" class="form-buttons hidden-div"> 
					<span id="${searchId}-resulting-form-search-button"> 
						<button class="form-search-button" type="button">${msg("dashlet.search.search_button.label")?html}</button>
					</span>
					
					<span id="${searchId}-resulting-form-clear-button">  
						<button class="form-clear-button" type="button">${msg("dashlet.search.back_button.label")?html}</button>
					</span> 
				</div> 
 			</div>
  		</div>
	</form>
</#macro>

<#macro renderFormFields fields searchId formIndex>
	<#list fields as f>
	
		 <#if f.type == "date">
		 	<@renderDateField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 <#elseif f.type == "daterange">
		 	<@renderDateRangeField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 <#elseif f.type == "select">
		 	<@renderSelectField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 <#elseif f.type == "boolean">
		 	<@renderBooleanField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 <#elseif f.type == "float">
		 	<@renderFloatField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 <#elseif f.type == "int">
		 	<@renderIntField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 <#else>
		 	<@renderTextField field=f searchId=searchId itemIndex=f_index formIndex=formIndex/>
		 </#if>
	</#list>
</#macro>

<#macro renderInvisibleFormFields position searchId formIndex>
	<div class="form-field custom-field">
		<label for="${searchId}-${formIndex}-${position}"  style="visibility:hidden;"/>Label</label>
		<input id="${searchId}-${formIndex}-${position}" name="-" style="visibility:hidden;" />
	</div>
</#macro>

<#macro renderReadOnlyField field searchId itemIndex>
	<div class="form-field custom-field read-only-field">
		<label for="${searchId}-${field.position}-${itemIndex}-read-only" />${field.label?html}:</label>
		<input id="${searchId}-${field.position}-${itemIndex}-read-only" name="${field.name?html}" type="text" readonly="readonly" 
			data-field-type="readOnly" data-field-label="${field.label?html}" value=<#if field.submit?? && field.submit && field.submitValue??>"${field.submitValue?html}"<#else>""</#if>/>
	</div>
</#macro>

<#macro renderHiddenFormFields hiddenFields searchId formIndex>
	<#list hiddenFields as f>
		<input id="${searchId}-${formIndex}-hidden-${f_index}" name="${f.name?html}" type="hidden" 
		data-field-type="hidden" value=<#if f.submit?? && f.submit && f.submitValue??>"${f.submitValue?html}"<#else>""</#if> />
	</#list>
</#macro>

<#macro renderIntField field searchId itemIndex formIndex>
	<div class="form-field custom-field">
		<label for="${searchId}-${formIndex}-${field.position}-${itemIndex}" title="${field.description?html} (int)" />${field.label?html}:</label>
		<input class="int-input" id="${searchId}-${formIndex}-${field.position}-${itemIndex}" name="${field.name?html}" type="text" data-field-type="${field.type}" data-field-label="${field.label?html}" title="${field.description?html} (int)" />
	</div>
</#macro>

<#macro renderFloatField field searchId itemIndex formIndex>
	<div class="form-field custom-field">
		<label for="${searchId}-${formIndex}-${field.position}-${itemIndex}"  title="${field.description?html} (float)" />${field.label?html}</label>
		<input class="float-input" id="${searchId}-${formIndex}-${field.position}-${itemIndex}" name="${field.name?html}" type="text" data-field-type="${field.type}" data-field-label="${field.label?html}" title="${field.description?html} (float)" />
	</div>
</#macro>

<#macro renderSelectField field searchId itemIndex formIndex>
	<div class=<#if field.hideField?? && field.hideField>"form-field custom-field hidden-div"<#else>"form-field custom-field"</#if>	>
		<label for="${searchId}-${formIndex}-${field.position}-${itemIndex}-select" title="${field.description?html} (text)" />${field.label?html}:</label>
		<select id="${searchId}-${formIndex}-${field.position}-${itemIndex}-select" name="${field.name?html}" data-field-type="${field.type}" data-field-label="${field.label?html}" data-listener-attached="false" title="${field.description?html} (text)">
			<#list field.selectOptions as selectOption>
            	<option value='${selectOption.id?html}'>${selectOption.label?html}</option>
        	</#list>
		</select>
	</div>
</#macro>

<#macro renderBooleanField field searchId itemIndex formIndex>
	<div class="form-field custom-field check-box-field">
		<input id="${searchId}-${formIndex}-${field.position}-${itemIndex}" type="hidden" data-field-type="${field.type}" data-field-label="${field.label?html}" name="${field.name?html}" value="false" />
		<input id="${searchId}-${formIndex}-${field.position}-${itemIndex}-entry" class="formsCheckBox" type="checkbox" name="-" title="${field.description?html} (boolean)" 
			onchange='javascript:YAHOO.util.Dom.get("${searchId}-${formIndex}-${field.position}-${itemIndex}").value=YAHOO.util.Dom.get("${searchId}-${formIndex}-${field.position}-${itemIndex}-entry").checked;' />
		<label for="${searchId}-${formIndex}-${field.position}-${itemIndex}-entry" title="${field.description?html} (boolean)" class="checkbox"  />${field.label?html}</label>
	</div>
</#macro>


<#macro renderTextField field searchId itemIndex formIndex>
	<div class="form-field custom-field">
		<label for="${searchId}-${formIndex}-${field.position}-${itemIndex}" title="${field.description?html} (text)" />${field.label?html}:</label>
		<input id="${searchId}-${formIndex}-${field.position}-${itemIndex}" name="${field.name?html}" type="text" data-field-type="${field.type}" data-field-label="${field.label?html}" title="${field.description?html} (text)" />
	</div>
</#macro>

<#macro renderDateField field searchId itemIndex formIndex>
	<div class="form-field custom-field">
		<#assign controlId="${searchId}-${formIndex}-${field.position}-${itemIndex}-cntrl">
		
   		<script type="text/javascript">
   			//<![CDATA[
   				(function() {new Alfresco.DatePicker("${controlId}", "${searchId}-${formIndex}-${field.position}-${itemIndex}").setMessages(${messages});})();
			//]]>
		</script>
		
		<input id="${searchId}-${formIndex}-${field.position}-${itemIndex}" type="hidden" name="-" value=""/>
		
		<label for="${controlId}-date" title="${field.description?html} (date)" >${field.label?html}:</label>
		
		<div class="date-input-container">
			<div class="date-input">
				<input id="${controlId}-date" name="${field.name?html}" type="text" class="date-entry" data-field-type="${field.type}" data-field-label="${field.label?html}" title="${field.description?html} (date)" />
				
				<a id="${controlId}-icon">
					<img src="${url.context}/res/components/form/images/calendar.png" class="datepicker-icon" />
				</a>
			</div>
			
			<div id="${controlId}" class="datepicker"></div>
							
			<div class="date-format-info">
				<span class="date-format">${msg("form.control.date-picker.entry.date.format")?html}</span>
			</div>
		</div>
						
	</div>
</#macro>

<#macro renderDateRangeField field searchId itemIndex formIndex>
	<div class="form-field custom-field">
		<#assign controlId="${searchId}-${formIndex}-${field.position}-${itemIndex}-cntrl">
		
   		<script type="text/javascript">
   			//<![CDATA[
   				(function() {new Alfresco.DateRange("${controlId}", "${searchId}-${formIndex}-${field.position}-${itemIndex}").setMessages(${messages});})();
			//]]>
		</script>
		
		<label for="${controlId}" title="${field.description?html} (daterange)" >${field.label?html}</label>
		
<#--	<input id="${searchId}-${formIndex}-${field.position}-${itemIndex}" type="hidden" name="${field.name?html}" data-field-type="wholeDate" value=""/>  -->	
		<input id="${searchId}-${formIndex}-${field.position}-${itemIndex}" type="hidden" name="-" data-field-type="wholeDate" value=""/>
		
		<div id="${controlId}">
			<div class="date-range">
				<div class="date-range-input-container">
					<span>${msg("dashlet.search.date-range.from")?html}:</span>
					
					<div>
						<div class="date-range-input">
							<#-- from date -->
							<input id="${controlId}-date-from" name="${field.nameFrom?html}" type="text" class="date-entry" data-field-type="${field.type}" data-field-label="${field.label?html}" title="${field.description?html} (date)" />
						
							<a id="${controlId}-icon-from">
								<img src="${url.context}/res/components/form/images/calendar.png" class="datepicker-icon" />
							</a>
						</div>
						
						<div id="${controlId}-from" class="datepicker"></div>
               			
						<div class="date-format-info">
							<span class="date-format">${msg("form.control.date-picker.entry.date.format")?html}</span>
						</div>
					</div>
				</div>
				<div class="date-range-input-container">
					<span>${msg("dashlet.search.date-range.to")?html}:</span>
					
					<div>
						<div class="date-range-input">
							<#-- to date -->
							<input id="${controlId}-date-to" name="${field.nameTo?html}" type="text" class="date-entry" data-field-type="${field.type}" data-field-label="${field.label?html}" title="${field.description?html} (date)" />
							
							<a id="${controlId}-icon-to">
								<img src="${url.context}/res/components/form/images/calendar.png" class="datepicker-icon" />
							</a>
               			</div>
						<div id="${controlId}-to" class="datepicker"></div>
               			
						<div class="date-format-info">
							<span class="date-format">${msg("form.control.date-picker.entry.date.format")?html}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</#macro>
	