const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ActivityReport = require('../models/activity_report_form');
const ActivityRequest = require('../models/activity_request_form');
const ChapterPersonnel = require('../models/chapter_personnel');
const Chapter = require('../models/chapter');
const CommitteeMembershipForm = require('../models/committee_membership_form');
const Committee = require('../models/committee');
const CouncilAdvisor = require('../models/council_advisor');
const CouncilMonthlyReport = require('../models/council_monthly_report');
const Council = require('../models/council');
const Document = require('../models/document');
const MembershipForm = require('../models/membership_form');
const Officer = require('../models/officer');
const OtherOrganizationsAffiliations = require('../models/other_organizations_affiliations');
const TrainingsAttended = require('../models/trainings_attended');
const User = require('../models/user');

Chapter.model.hasMany(Council.model, {foreignKey: 'chapter_id',sourceKey: 'id'});
Council.model.belongsTo(Chapter.model, {foreignKey: 'chapter_id'});



exports.getUser = async (req, res) => {
    let ret = await User.model.findOne({
        where: {
            username: req.body.username
        }
    })
    return ret;
}


//Used in creating a council
exports.getAllChapters = async (req, res) => {
    let ret = await Chapter.model.findAll();
    
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // res.send(ret);
    return ret;
}

//so far not used anymore
exports.getCommitteesOfCouncil = async (req, res) => {
    let ret = await Committee.model.findAll({
        where: {
            council_id: 10      //get council_id from Session variable
        }
    });
    return ret
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // res.send(ret);
}

async function getCouncilId(userId){
    let ret = await Council.model.findOne({
        where: {
            user_id: userId
        }
    })
    return ret
}

//Used in Committee Membership Form
exports.getMembersOfCommittee = async(req, res) => {
    let council = await getCouncilId(req.params.userId)
    let committee = await Committee.model.findOne({
        where: {
            council_id: council.id,     //get council_id from Session variable
            type: req.params.type
        }
    });
console.log(req.params.type)
    let ret = await MembershipForm.model.findAll({
        where: {
            committee_membership_id: committee.id
        }
    });
console.log(ret)
    return ret
}

// Used in Committee Membership Form when adding a member to a committee
exports.getNoneCommitteeMembers = async(req, res) => {
    const Doc = MembershipForm.model.belongsTo(Document.model, {foreignKey:'document_id'});

    let ret = await MembershipForm.model.findAll({
        where: {
            committee_membership_id: null,
        },
        include: [ Doc ]
    }
    );

    return ret;
}


// Used in masterlist
exports.getCouncilPendingMemForms = async(req, res) => {
    let ret = await MembershipForm.model.findAll({
        where: {
            council_pres_sig: 0,
        },
    });

    return ret;
}
exports.getCouncilAdvPendingMemForms = async(req, res) => {
    let ret = await MembershipForm.model.findAll({
        where: {
            council_adv_sig: 0,
        },
    });

    return ret;
}



exports.getFilledMemForm = async (req, res) => {
    let ret = await MembershipForm.model.findOne({
        where: {
            id: req.params.id
        }
    })
    return ret;
}

exports.getMemTrainings = async (req, res) => {
    let ret = await TrainingsAttended.model.findAll({
        where: {
            rcy_id: req.rcy_id
        }
    })
    return ret;
}

exports.getMemOrgs = async (req, res) => {
    let ret = await OtherOrganizationsAffiliations.model.findAll({
        where: {
            rcy_id: req.rcy_id
        }
    })
    return ret;
}

exports.getAllCouncils = async (req, res) => {
    let ret = await Council.model.findAll();
    
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // res.send(ret);
    return ret;
}