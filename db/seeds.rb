# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
project = Project.create( title: "A demo Project", description: "a description of a project", public: true, focus_area: "Reduce child mortality" );

real_problem = RealProblem.create( title: "A real world problem", description: "a description of a real problem", project_id: project.id, goal: "a goal for a real problem" );

policy_problem = PolicyProblem.create( title: "A policy problem", description: "a description for a problem", real_problem_id: real_problem.id );

Solution.create( title: "A solution", description: "a description for a solution", policy_problem_id: policy_problem.id );