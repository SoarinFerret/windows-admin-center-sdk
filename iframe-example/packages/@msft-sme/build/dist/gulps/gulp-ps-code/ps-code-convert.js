"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PsCodeConverter = /** @class */ (function () {
    function PsCodeConverter(options) {
        this.options = options;
        this.options = options ? options : { noComments: true };
        if (!this.options.hasOwnProperty('noComments')) {
            this.options.noComments = true;
        }
    }
    PsCodeConverter.prototype.contentReset = function () {
        this.outputTs = '';
    };
    PsCodeConverter.prototype.contentAddTs = function (line) {
        this.outputTs += line;
        return line;
    };
    PsCodeConverter.prototype.indent = function (count) {
        var pad = '';
        for (var i = 0; i < count; i++) {
            pad += '    ';
        }
        return pad;
    };
    PsCodeConverter.prototype.generate = function (collection) {
        var tsBase = null;
        this.contentAddTs(PsCodeConverter.openContent);
        this.addData(collection);
        this.contentAddTs(PsCodeConverter.closeContent);
    };
    PsCodeConverter.prototype.jsonName = function (original) {
        var name = original[0].toLowerCase() + original.substr(1);
        name = this.replaceAll(name, '-', '_');
        name = name.substr(0, name.length - 4);
        return name;
    };
    PsCodeConverter.prototype.regexEscape = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };
    PsCodeConverter.prototype.replaceAll = function (input, searchValue, replaceValue) {
        return input.replace(new RegExp(this.regexEscape(searchValue), 'g'), replaceValue);
    };
    PsCodeConverter.prototype.addToContent = function (name, script, indent) {
        this.contentAddTs(this.indent(indent) + 'export let ' + name + ': string = ' + script + ';\n');
    };
    PsCodeConverter.prototype.addData = function (current) {
        var keys = Object.keys(current);
        var _loop_1 = function (key) {
            var script = '';
            var content = current[key];
            var name_1 = this_1.jsonName(key);
            script = '##' + name_1 + '##:' + key + '\n';
            var removeComments = this_1.options.noComments;
            if (content.indexOf(PsCodeConverter.removeCommentsFalse) > 0) {
                removeComments = false;
            }
            else if (content.indexOf(PsCodeConverter.removeCommentsTrue) > 0) {
                removeComments = true;
            }
            var skipping = false;
            var lines = content.split('\r');
            lines.forEach(function (value, index, array) {
                var text = value.replace('\n', '');
                if (removeComments) {
                    var process_1 = true;
                    text = text.trim();
                    if (text.startsWith(PsCodeConverter.commentStart)) {
                        skipping = true;
                    }
                    if (skipping) {
                        process_1 = false;
                        if (text.endsWith(PsCodeConverter.commentEnd)) {
                            skipping = false;
                        }
                    }
                    if (process_1 && !text.startsWith(PsCodeConverter.comment) && text.length > 0) {
                        script += text + '\n';
                    }
                }
                else {
                    script += text + '\n';
                }
            });
            var data = JSON.stringify(script);
            data = this_1.replaceAll(data, '\'', '\\u0027');
            data = this_1.replaceAll(data, '<', '\\u003c');
            data = this_1.replaceAll(data, '>', '\\u003e');
            data = this_1.replaceAll(data, '&', '\\u0026');
            this_1.addToContent(name_1, data, 2);
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
        }
    };
    PsCodeConverter.removeCommentsTrue = '##RemoveComments=true##';
    PsCodeConverter.removeCommentsFalse = '##RemoveComments=false##';
    PsCodeConverter.commentStart = '<#';
    PsCodeConverter.commentEnd = '#>';
    PsCodeConverter.comment = '#';
    PsCodeConverter.openContent = "/* tslint:disable */\n/**\n * @file Source code generated by gulp-ps-code.\n * @version 1.0\n */\n\nexport module PowerShellScripts {\n    'use strict'\n    export module Scripts {\n";
    PsCodeConverter.closeContent = "    }\n}\n";
    return PsCodeConverter;
}());
exports.PsCodeConverter = PsCodeConverter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWxwcy9ndWxwLXBzLWNvZGUvcHMtY29kZS1jb252ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0E7SUEwQ0kseUJBQW9CLE9BQWlCO1FBQWpCLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBdkJNLHNDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLHNDQUFZLEdBQXBCLFVBQXFCLElBQVk7UUFDN0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7UUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sZ0NBQU0sR0FBZCxVQUFlLEtBQWE7UUFDeEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QixHQUFHLElBQUksTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQVNNLGtDQUFRLEdBQWYsVUFBZ0IsVUFBdUM7UUFDbkQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENB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QUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQzs7UUE1Q0QsR0FBRyxDQUFDLENBQVksVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7WUFBZixJQUFJLEdBQUcsYUFBQTtvQkFBSCxHQUFHO1NBNENYO0lBQ0wsQ0FBQztJQXpIYyxrQ0FBa0IsR0FBRyx5QkFBeUIsQ0FBQztJQUMvQyxtQ0FBbUIsR0FBRywwQkFBMEIsQ0FBQztJQUNqRCw0QkFBWSxHQUFHLElBQUksQ0FBQztJQUNwQiwwQkFBVSxHQUFHLElBQUksQ0FBQztJQUNsQix1QkFBTyxHQUFHLEdBQUcsQ0FBQztJQUNkLDJCQUFXLEdBQzlCLHdMQVNDLENBQUM7SUFDaUIsNEJBQVksR0FDL0IsWUFFQyxDQUFDO0lBdUdGLHNCQUFDO0NBM0hELEFBMkhDLElBQUE7QUEzSFksMENBQWUiLCJmaWxlIjoiZ3VscHMvZ3VscC1wcy1jb2RlL3BzLWNvZGUtY29udmVydC5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiJDOlxcQkFcXDQxN1xccyJ9