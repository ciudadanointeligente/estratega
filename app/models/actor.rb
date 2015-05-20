class Actor < ActiveRecord::Base
  validates :name, presence: true

  def type_list
  	actorTypeList = ['Active opponents with influence', 'Active opponents with low influence', 'Passive opponents with influence', 'Passive opponents with low influence', 'Neutrals with influence', 'Neutrals with low influence', 'Passive supporters with influence', 'Passive supporters with low influence', 'Active supporters with influence', 'Active supporters with low influence']
  	return actorTypeList
  end
end
