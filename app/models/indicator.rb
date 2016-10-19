class Indicator < ActiveRecord::Base
  belongs_to :activity, touch: true
  belongs_to :objective, touch: true
  belongs_to :outcome, touch: true
  belongs_to :ask, touch: true
end
