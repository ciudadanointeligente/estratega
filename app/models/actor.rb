class Actor < ActiveRecord::Base
  validates :name, presence: true
  has_and_belongs_to_many :objectives
  has_many :asks

  def actor_type_list
    actor_type = ['Active opponents with influence', 'Active opponents with low influence', 'Passive opponents with influence', 'Passive opponents with low influence', 'Neutrals with influence', 'Neutrals with low influence', 'Passive supporters with influence', 'Passive supporters with low influence', 'Active supporters with influence', 'Active supporters with low influence']
    return actor_type
  end

  def actor_support_list
    actor_support = {'Very supportive' => 2, 'Significant Support' => 1, 'Low support' => -1, 'No support' => -2}
    return actor_support
  end

  def actor_influence_level_list
    actor_influence_level = {'Very influential' => 2, 'Significant influence' => 1, 'Moderate influence' => 0, 'Low influence' => -1, 'No influence' => -2}
    return actor_influence_level
  end
end
