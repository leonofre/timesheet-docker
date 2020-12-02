const TimeSheet = require('../Models/TimeSheet.model');

module.exports = async function workingBetweenDays( days, hours, minutes, seconds, start, timesheet, results = {"result": []} ) {
    if ( days > 0 ) {
        var end = new Date( start )

        end.setUTCMinutes( 59 );
        end.setUTCSeconds( 59 );
        end.setUTCHours( 23 );

        timesheet = new TimeSheet({
          "user": timesheet.user,
          "project": timesheet.project,
          "billable": timesheet.billable,
        });

        timesheet.start = start.getTime();
        timesheet.end = end.getTime();

        var result = await timesheet.save();

        results.result.push( result );

        end.setSeconds(  end.getSeconds() + 1 );

        start = end;

        seconds -= 86399;
        minutes -= 86399 / 60;
        hours   -= 86399 / 3600;

        days -= 1;

        return workingBetweenDays( days, hours, minutes, seconds, start, timesheet, results );
    }

    var end = new Date( start )

    end.setUTCMinutes( seconds - minutes * 60 );
    end.setUTCSeconds( minutes - hours * 60 );
    end.setUTCHours( hours % 24 );

    timesheet = new TimeSheet({
        "user": timesheet.user,
        "project": timesheet.project,
        "billable": timesheet.billable,
    });

    timesheet.start = start.getTime();
    timesheet.end = end.getTime();

    var result = await timesheet.save();

    results.result.push( result );
    results.seconds = 0;

    return results;

}