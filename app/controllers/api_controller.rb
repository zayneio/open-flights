
class ApiController < ApplicationController
  include Authable
  # skip_before_action :verify_authenticity_token
end
