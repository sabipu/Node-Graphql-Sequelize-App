import { Course } from "#root/db/models";
import { start } from "repl";

const enrollmentCalculator = async (courseId, startDate, category) => {
    var currentTime = new Date();
    var courseProcessingDays = null;
    var actualCourseStartDate = new Date(startDate);

    var enrollmentDetails = {
        courseId: courseId,
        courseStartDate: new Date(startDate),
        course_name: null,
        course_category: null,
        course_start_date: null,
        applicate_submission_date: null,
        offer_letter_date: null,
        offer_accpetance_date: null,
        gte_assessment_date: null,
        ecoe_date: null,
        actual_ecoe_received_date: null,
        visa_application_lodge_date: null,
        processing_time: null,
        bonus_amount: null,
        status: null,
        msg: null
    }

    if(!courseId || !startDate) {
        enrollmentDetails.status = false;
        enrollmentDetails.msg = "Course or course start date not provided.";
    } else {
        const course = await Course.findByPk(courseId);

        if(course === null) {
            enrollmentDetails.status = false;
            enrollmentDetails.msg = "No course with such ID";
        } else {
            courseProcessingDays = course.application_processing_days;
            var courseName = course.course_name;
            var courseBonusAmount = null;

            if(category === 'onshore') {
                courseBonusAmount = course.onshore_bonus_amount;
            } else {
                courseBonusAmount = course.onshore_bonus_amount;
            }

            enrollmentDetails.processing_time = courseProcessingDays;
            enrollmentDetails.course_name = courseName;
            enrollmentDetails.bonus_amount = courseBonusAmount;
        }
    }

    if(courseProcessingDays) {
        var visaApplicationLodgeDate = new Date(startDate).setDate(actualCourseStartDate.getDate()-(courseProcessingDays -44 ));
        var ecoeDate = new Date(startDate).setDate(actualCourseStartDate.getDate()-(courseProcessingDays - 40));
        var gteDate = new Date(startDate).setDate(actualCourseStartDate.getDate()-(courseProcessingDays - 35));
        var offerAcceptanceDate = new Date(startDate).setDate(actualCourseStartDate.getDate()-(courseProcessingDays - 18));
        var offerLetterDate = new Date(startDate).setDate(actualCourseStartDate.getDate()-(courseProcessingDays - 6));
        var applicationSubmissionDate = new Date(startDate).setDate(actualCourseStartDate.getDate()-(courseProcessingDays - 2));
        

        enrollmentDetails.visa_application_lodge_date = new Date(visaApplicationLodgeDate);
        enrollmentDetails.ecoe_date = new Date(ecoeDate);
        enrollmentDetails.gte_assessment_date = new Date(gteDate);
        enrollmentDetails.offer_accpetance_date = new Date(offerAcceptanceDate);
        enrollmentDetails.offer_letter_date = new Date(offerLetterDate);
        enrollmentDetails.applicate_submission_date = new Date(applicationSubmissionDate);
    }



    return enrollmentDetails;
}

export default enrollmentCalculator;