/* Perform a case insensitive check too see if the input matches the list of current brazilian states.
 * Made with an array instead of regex to improve readability and the ability to add/change the array itens if needed
*/
$.validator.addMethod( "statesBR", function( UF, element ) {
    var states = [ "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO" ];
    return this.optional( element ) ||  ( states.includes( UF.toUpperCase() ) );
}, "Insert the state abbreviation (ex: São Paulo = SP)" );
